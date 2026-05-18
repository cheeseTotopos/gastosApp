using Microsoft.AspNetCore.Mvc;

//For a class to be an controller must extend the class ControllerBase or Controller
//A class must have the atribute [ApiController] to acept to become an controller

[ApiController]

//this is the way to declare that all our endpoints (methods that can be requested for our frontend) will begin with "auth"
[Route("auth")]
public class AuthController : ControllerBase
{

    //this is not the correct form to initialize an object. This is like initializing manually
    //private LoginService _loginService = new LoginService();

    //this is the correct way, using the readonly. This initialize form is from the builder.Services we declared in Program.cs file
    private readonly LoginService _loginService;
    private readonly TokenConstructor _tc;

    public AuthController(LoginService loginservice, TokenConstructor tc)
    {
        _loginService = loginservice;
        _tc = tc;
    }

    [HttpPostAttribute("login")]
    
    //IActionResult allow to return http status, like Ok (200), Unathorized (401), BadRequest(400), NotFound(404)
    public IActionResult Login([FromBody] AuthBase login /*string username, string pwd*/)
    {
        var user = _loginService.Login(login.Username, login.Pwd);
        if(user == null)
            return Ok("usuario no encontrado :(");

        var token = _tc.TokenGenerator(user);

        return Ok(new {token = token});
    }

    [HttpPostAttribute("register")]
    public IActionResult RegisterUser([FromBody] RegisterUser register /*string username, string pwd, DateOnly bd, decimal amount*/)
    {
        if (register.Username == "" || register.Username == null)
            return BadRequest("El nombre de usuario no puede ser vacío");
        
        if (register.Pwd == "" || register.Pwd == null)
            return BadRequest("La contraseña no puede ser vacía");

        if(register.Amount < 0)
            return BadRequest("El monto no puede ser negativo");
        
        var lastId = _loginService.RegisterUser(register.Username.TrimEnd(), register.Pwd.TrimEnd(), register.BD, register.Amount);
        
        return Ok("Usuario " + register.Username + " registrado con éxito");
    }
}