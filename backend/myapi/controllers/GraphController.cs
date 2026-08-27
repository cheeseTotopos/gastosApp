using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("graphs")]
public class GraphController(GraphService _gs, TokenService _ts): ControllerBase
{
    [Authorize]
    [HttpPost("experyear")]
    public async Task<IActionResult> ExPerYear([FromBody] GraphRequest data)
    {
        var userid = _ts.GetUserId(User);
        var result = await _gs.ExpensesPerYear(userid, data.Year);

        if(result.Success == false)
            return BadRequest(result.Message);

        return Ok(result.Data);
    }

    [Authorize]
    [HttpPost("invexp")]
    public async Task<IActionResult> Invexp([FromBody] GraphRequest data)
    {
        var userid = _ts.GetUserId(User);

        var result = await _gs.Invexp(userid, data.Year);

        if(result.Success == false)
            return BadRequest(result.Message);

        return Ok(result.Data);
    } 

    [Authorize]
    [HttpPost("topclas")]
    public async Task<IActionResult> TopClasifications([FromBody] GraphRequest data)
    {
        var userid = _ts.GetUserId(User);

        var result = await _gs.TopClasifications(userid, data.Year);

        if(result.Success == false)
            return BadRequest(result.Message);

        return Ok(result.Data);
    } 
}