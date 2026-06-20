using Microsoft.EntityFrameworkCore;

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

        //add the movement
        await _conn.Movements.AddAsync(movement);

        //increase or decrease the user amount
        await _us.AffectAmount(data.MT, data.Amount, data.UserId);
        //save the changes
        await _conn.SaveChangesAsync();

        return new ResponseFormat<Movement?>
        {
            Success = true,
            Message = "Movimiento creado con éxito",
            Data = movement
        };
    } 

    public async Task<ResponseFormat<GetMovementsResponse?>> GetMovements(MovementDate data)
    {
        //check if the user exists
        var user = await _us.UserExists(data.UserId);
        if(user == null)
            return new ResponseFormat<GetMovementsResponse?>
            {
                Success = false,
                Message = "El usuario no fue encontrado",
                Data = null
            };

        //if the final date of the range its null, we use the currentdate
        DateOnly? finalDate = data.FinalDate;
        if(finalDate == null)
            finalDate = DateOnly.FromDateTime(DateTime.Now);

        var movements = await (from m in  _conn.Movements
                        where m.UserId == user.Id
                        join clas in _conn.Clasifications on m.ClasificationId equals clas.Id
                        orderby m.MT
                        select new MovementsCompleteDescription
                        {
                            MT = m.MT,
                            ClasificationId = clas.Id,
                            ClasificationDescription = clas.Description,
                            MovementId = m.Id,
                            MovementAmount = m.Amount,
                            MovementDescription = m.Description,
                        }).ToListAsync();

        var response = new GetMovementsResponse
        {
            UserId = user.Id,
            UserName = user.Name,
            UserAmount = user.Amount,
            Movements = movements,
        };

        return new ResponseFormat<GetMovementsResponse?>
        {
            Success = true,
            Message = "Movimientos obtenidos con éxito",
            Data = response
        };
    }

}