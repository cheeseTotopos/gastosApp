using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("creditcards")]
public class CreditCardController(TokenService _ts, CreditCardService _ccs): ControllerBase
{
    [Authorize]
    [HttpPost("add")]
    public async Task<IActionResult> AddCreditCard([FromBody] AddCCDTO data)
    {
        var userId = _ts.GetUserId(User);
        var result = await _ccs.Add(userId, data.CardName);

        if(result.Success == false)
            return BadRequest(result.Message);

        return Ok(result);
    }

    [Authorize]
    [HttpPost("edit")]
    public async Task<IActionResult> EditCreditCard([FromBody] EditCCDTO data)
    {
        var userId = _ts.GetUserId(User);
        var result = await _ccs.EditCreditCard(userId, data.CardId, data.NewName);

        if(result.Success == false)
            return BadRequest(result.Message);

        return Ok(result);
    }

    [Authorize]
    [HttpPost("change-status")]
    public async Task<IActionResult> ChangeStatus([FromBody] JustCardId data)
    {
        var userId = _ts.GetUserId(User);
        var result = await _ccs.ChangeActiveStatus(userId, data.CardId);

        if(result.Success == false)
            return BadRequest(result.Message);

        return Ok(result);
    }

    [Authorize]
    [HttpPost("getcreditcards")]
    public async Task<IActionResult> GetCreditCards()
    {
        var userId = _ts.GetUserId(User);
        var result = await _ccs.GetUserCC(userId);

        if(result.Success == false)
            return BadRequest(result.Message);

        return Ok(result);
    }
}