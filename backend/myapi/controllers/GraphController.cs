using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("graphs")]
public class GraphController(GraphService _gs, TokenService _ts): ControllerBase
{
    [Authorize]
    [HttpPost("experyear")]
    public async Task<IActionResult> ExPerYear([FromBody] ExpensesPerYearRequest data)
    {
        var userid = _ts.GetUserId(User);
        var result = await _gs.ExpensesPerYear(userid, data.Year);

        if(result.Success == false)
            return BadRequest(result.Message);

        return Ok(result.Data);
    }
}