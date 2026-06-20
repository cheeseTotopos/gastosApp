using Microsoft.AspNetCore.Mvc;

//For a class to be an controller must extend the class ControllerBase or Controller
//A class must have the atribute [ApiController] to acept to become an controller

[ApiController]

//this is the way to declare that all our endpoints (methods that can be requested for our frontend) will begin with "auth"
[Route("auth")]
public class AuthController(LoginService _loginService, TokenConstructor _tc) : ControllerBase
{

    [HttpPostAttribute("login")]
    
    //IActionResult allow to return http status, like Ok (200), Unathorized (401), BadRequest(400), NotFound(404)
    public async Task<IActionResult> Login([FromBody] AuthBase login /*string username, string pwd*/)
    {
        var user = await _loginService.Login(login);
        if(user.Success == false)
            return Unauthorized(user);

        if(user.Data == null)
            return Unauthorized(user);

        var token = _tc.TokenGenerator(user.Data);

        return Ok(new {
            token = token,
            Sucess = user.Success,
            Message = user.Message,
            Data = user.Data
        });
    }

    [HttpPostAttribute("register")]
    public async Task<IActionResult> RegisterUser([FromBody] RegisterUser data)
    {
        
        var user = await _loginService.RegisterUser(data);

        if(user.Data == null || user.Success == false)
            return BadRequest(user.Message);

        var token = _tc.TokenGenerator(user.Data);
        return Ok(new {
            token = token,
            Succes = user.Success,
            Message = user.Message,
            Data = user.Data
        });
    }
}