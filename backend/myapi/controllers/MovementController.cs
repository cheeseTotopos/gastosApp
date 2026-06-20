using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;


[ApiController]
[Route("movements")]
public class MovementController(MovementService _ms): ControllerBase
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
}