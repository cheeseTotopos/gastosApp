public class LoginService
{
    private readonly UserService _UserService;
    private readonly AppDBConection _conn;

    public LoginService(UserService userservice, AppDBConection conn)
    {
        _UserService = userservice;
        _conn = conn;
    }

    //The ? sign is to tell that the method can return a null 
    public User? Login(string username, string pwd)
    {
        var user = _UserService.GetUser(username, pwd);

        if (user == null) return null;

        if (user.Pwd != pwd) return null;

        return user;
    }

    public int RegisterUser(string name, string pwd, DateOnly bd, decimal amount)
    {
        var lastId = _UserService.Add(name, pwd, bd, amount);
        return lastId;
    }
}