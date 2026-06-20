using Microsoft.EntityFrameworkCore;

public class UserService(AppDBConection _conn)
{

    public async Task<User> Add(string name, string pwd, DateOnly bd, decimal amount)
    {
        User user = new User
        {
            Name = name.Trim(),
            Pwd = BCrypt.Net.BCrypt.HashPassword(pwd),//saving the password hashed
            BD = bd,
            Amount = amount,
        };
        await _conn.Users.AddAsync(user);
        await  _conn.SaveChangesAsync();
        return user;
    }

    public async Task<User?> GetUser(string username, string pwd)
    {
        var user = await _conn.Users.FirstOrDefaultAsync(u => u.Name == username);

        if(user == null)
            return null;

        bool validPassword = BCrypt.Net.BCrypt.Verify(pwd, user.Pwd);

        if(!validPassword)
            return null;

        return user;
    }
    public async Task<User?> GetUserById(int userid)
    {
        return await _conn.Users.FirstOrDefaultAsync(u => u.Id == userid);
    }

    //find a user with its id
    public async Task<User?> UserExists(int userid)
    {
        var user = await _conn.Users.FindAsync(userid);
        return user;
    }

    //decrease the user amount. This is used when a user create a movement. Return true if the user amount is modified correctly.
    //False in other case
    public async Task AffectAmount(int mt, decimal quantity, int userid)
    {
        var user = await _conn.Users.FindAsync(userid);

        if (user != null)
        {
            //si es gasto
            if (mt == 1)
                user.Amount -= quantity;
            else
                user.Amount += quantity;
                
            await _conn.SaveChangesAsync();
        }
    }
}