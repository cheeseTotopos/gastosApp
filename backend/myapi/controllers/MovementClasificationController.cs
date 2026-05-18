using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("clasifications")]
public class MovementClasificationController: ControllerBase
{
    private readonly MovementClasificationService _clasificationservice;

    public MovementClasificationController(MovementClasificationService service)
    {
        _clasificationservice = service;
    }

    [HttpPostAttribute("add")]
    public IActionResult Add([FromBody] AddClasification clas)
    {
        var movementTypeExists = _clasificationservice.IsMovementTypeValid(clas.MT);
        if(!movementTypeExists)
            return BadRequest("Ese tipo de movimiento no existe");

        var result = _clasificationservice.Add(clas.UserId, clas.Description, clas.MT);
        if(!result)
            return Unauthorized("Usuario no encontrado");

        return Ok("Clasificacion " + clas.Description + " añadida correctamente");
    }

    [HttpPostAttribute("edit")]
    public IActionResult Edit([FromBody] EditClasification edit)
    {

        if(edit.NewDescription == "" || edit.NewDescription == null)
            return Unauthorized("El nuevo nombre de la clasificacion no puede ser vacío");
            
        var result = _clasificationservice.Edit(edit.ClasificationId, edit.NewDescription);

        if(!result)
            return Unauthorized("Clasificacion no encontrada");

        return Ok("Clasificacion cambiada con éxito");
    }
}
