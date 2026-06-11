using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("clasifications")]
public class MovementClasificationController(MovementClasificationService _cs): ControllerBase
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
}
