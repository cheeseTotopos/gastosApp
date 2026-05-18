public class MovementService
{

    private readonly AppDBConection _conn;
    private readonly UserService _userservice;

    public MovementService(AppDBConection connection, UserService uservice)
    {
        _conn = connection;
        _userservice = uservice;
    }
    public bool Add(DateOnly date, int movementType, decimal amount, string description, int userId, int clasificationId)
    {

        Movement movement = new Movement
        {
            MovementDate = date,
            MT = movementType,
            Amount = amount,
            Description = description,
            UserId = userId,
            ClasificationId = clasificationId
        };
        
        //add the movement to the db
        _conn.Movements.Add(movement);
        //decrease the movement amount to the user amount
        var amountModifiedCorrectly = _userservice.AffectAmount(movementType, amount, userId);

        if (amountModifiedCorrectly)
        {
            _conn.SaveChanges();
            return true;
        }

        return false;
    } 

}