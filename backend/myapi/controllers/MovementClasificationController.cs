using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("clasifications")]
public class MovementClasificationController(MovementClasificationService _cs, TokenService _ts): ControllerBase
{
    [Authorize]
    [HttpPostAttribute("add")]
    public async Task<IActionResult> Add([FromBody] AddClasification data)
    {
        var result = await _cs.Add(data);
        if(result.Success == false)
            return Unauthorized(result.Message);

        return Ok(result);
    }

    [Authorize]
    [HttpPostAttribute("edit")]
    public async Task<IActionResult> Edit([FromBody] EditClasification data)
    {
            
        var result = await _cs.Edit(data);

        if(result.Success == false)
            return Unauthorized(result.Message);

        return Ok(result);
    }

    [Authorize]
    [HttpPostAttribute("getclasifications")]
    public async Task<IActionResult> GetClasifications()
    {
        //from where User property appears? 
        //When extending a class from ControllerBase, the ControllerBase have a a property named User of the tyep ClaimsPrincipal. 
        //the User property gains its value when the middleware (the process that intercepts the query before it arrives to the controller, that in our case is [Authorize])
        //validates the token.

        foreach (var claim in User.Claims)
        {
            Console.WriteLine($"{claim.Type}: {claim.Value}");
        }

        int userid = _ts.GetUserId(User);
        var response = await _cs.GetUserClasificationsTotals(userid);
        if(response.Success == false)
            return Unauthorized(response.Message);

        return Ok(response);
    }
}
