using Microsoft.EntityFrameworkCore;

public class UserService(AppDBConection _conn)
{

    public async Task<User> Add(string name, string pwd, DateOnly bd, decimal amount)
    {
        User user = new User
        {
            Name = name,
            Pwd = pwd,
            BD = bd,
            Amount = amount,
        };
        await _conn.Users.AddAsync(user);
        await  _conn.SaveChangesAsync();
        return user;
    }

    public async Task<User?> GetUser(string username, string pwd)
    {
        return await _conn.Users.FirstOrDefaultAsync(u => u.Name == username && u.Pwd == pwd);
    }

    //find a user with its id
    public async Task<User?> UserExists(int userid)
    {
        var user = await _conn.Users.FindAsync(userid);
        return user;
    }

    //decrease the user amount. This is used when a user create a movement. Return true if the user amount is modified correctly.
    //False in other case
    public bool AffectAmount(int mt, decimal quantity, int userid)
    {
        var user = _conn.Users.Find(userid);

        if(user == null)   
            return false;

        //si es gasto
        if (mt == 1)
            user.Amount -= quantity;
        else
            user.Amount += quantity;
            
        return true;
    }
}