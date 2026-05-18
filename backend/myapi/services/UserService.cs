public class UserService
{
    public List<User> users = new List<User>{};

    private readonly AppDBConection _conn;

    public UserService(AppDBConection conn)
    {
        _conn = conn;
    }

    public int Add(string name, string pwd, DateOnly bd, decimal amount)
    {
        //this way will not work, because on  our class we have an empty constructor, for ef to work the correct way.
        //What we could do is instance the object withour passing to the constructor
        //User user = new User(name, pwd, bd, amount);

        User user = new User
        {
            Name = name,
            Pwd = pwd,
            BD = bd,
            Amount = amount,
        };
        _conn.Users.Add(user);
        var lastId = _conn.SaveChanges();
        return lastId;
    }

    public User? GetUser(string username, string pwd)
    {
        return _conn.Users.FirstOrDefault(u => u.Name == username && u.Pwd == pwd);
    }

    //find a user with its id
    public bool UserExists(int userid)
    {
        var user = _conn.Users.Find(userid);

        if(user == null)
            return false;

        return true;
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