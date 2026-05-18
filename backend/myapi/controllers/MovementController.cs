using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("movements")]
public class MovementController: ControllerBase
{
    private readonly UserService _userservice;
    private readonly MovementClasificationService _clasificationservice;
    private readonly MovementService _movementservice;
    public MovementController(UserService userservice, MovementClasificationService clasificationservice, MovementService movementservice)
    {
        _userservice = userservice;
        _clasificationservice = clasificationservice;
        _movementservice = movementservice;
    }

    [HttpPost("add")]
    public IActionResult Add([FromBody] MovementBase mov)
    {
        //check if the movementType is valid (inversion, gasto o ingreso)
        var isValidClasification = _clasificationservice.IsMovementTypeValid(mov.MT);
        if (!isValidClasification)
            return BadRequest("Clasificacion invalida");

        //check if user exists
        var userExists = _userservice.UserExists(mov.UserId);
        if(!userExists)
            return BadRequest("Usuario no encontrado");

        //check if the clasification exists AND belongs to the user
        var belongsToUser = _clasificationservice.ClasificationBelongToUser(mov.UserId, mov.ClasificationId);
        if(!belongsToUser)
            return BadRequest("El usuario no tiene esta clasificacion");
            
        var result = _movementservice.Add(mov.Date, mov.MT, mov.Amount, mov.Description, mov.UserId, mov.ClasificationId);
        return Ok("Movimiento creado");
    }
}