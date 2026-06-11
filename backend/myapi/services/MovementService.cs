public class MovementService(AppDBConection _conn, UserService _us, MovementClasificationService _cs)
{
    public async Task<ResponseFormat<Movement?>> Add(MovementBase data)
    {
        //check if the user exists
        var user = await _us.UserExists(data.UserId);
        if(user == null)
            return new ResponseFormat<Movement?>
            {
                Success = false,
                Message = "El usuario no fue encontrado",
                Data = null
            };

        //check if the mt is valid
        var validMt = _cs.IsMovementTypeValid(data.MT);
        if(validMt == false)
        return new ResponseFormat<Movement?>
            {
                Success = false,
                Message = "El tipo de movimiento no es válido",
                Data = null
            };

        //check if the clasification belongs to user
        var belongs = await _cs.ClasificationBelongToUser(data.UserId, data.ClasificationId);
        if(belongs == false)
            return new ResponseFormat<Movement?>
            {
                Success = false,
                Message = "La clasificación no pertenece al usuario",
                Data = null
            };

        var movement = new Movement
        {
            MovementDate = data.Date,
            MT = data.MT,
            Amount = data.Amount,
            Description = data.Description,
            UserId = data.UserId,
            ClasificationId = data.ClasificationId
        };

        await _conn.Movements.AddAsync(movement);
        await _conn.SaveChangesAsync();

        return new ResponseFormat<Movement?>
        {
            Success = true,
            Message = "Movimiento creado con éxito",
            Data = movement
        };
    } 

}