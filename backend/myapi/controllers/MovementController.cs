using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;


[ApiController]
[Route("movements")]
public class MovementController(MovementService _ms, TokenService _ts): ControllerBase
{
    [Authorize]
    [HttpPost("add")]
    public async Task<IActionResult> Add([FromBody] MovementBase data)
    {
        var response = await _ms.Add(data);
        if(response.Success == false)
            return Unauthorized(response.Message);
        
        return Ok(response);
    }

    [Authorize]
    [HttpPost("getmovements")]
    public async Task<IActionResult> GetMovements([FromBody] MovementDate data)
    {
        var response = await _ms.GetMovements(data);

        if(response.Success == false)
            return Unauthorized(response);

        return Ok(response);
    }

    [Authorize]
    [HttpPost("getmovementstotals")]
    public async Task<IActionResult> GetMovementsTotals([FromBody] MovementDate data)
    {
        var response = await _ms.GetMovementsTotal(data);
        if(response.Success == false)
            return Unauthorized(response);

        return Ok(response);
    }

    [Authorize]
    [HttpPost("addMany")]
    public async Task<IActionResult> AddMultiple([FromBody] AddMultiple data)
    {
        var userId = _ts.GetUserId(User);
        var response = await _ms.AddMultiple(userId, data);

        if(response.Success == false)
            return BadRequest(response.Message);

        return Ok(response.Message);
    }
}