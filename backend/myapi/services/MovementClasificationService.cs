using System.ComponentModel;
using System.Runtime.CompilerServices;

public class MovementClasificationService
{
    public List<MovementClasification> Clasifications = new List<MovementClasification>{};
    private readonly UserService _userService;
    private readonly AppDBConection _conn;

    //dependency inyection
    public MovementClasificationService(UserService userservice, AppDBConection connection)
    {
        _userService = userservice;
        _conn = connection;
    }

    public bool Add(int userid, string description, int movementypeid /*inversion, gasto o ingreso*/)
    {
        //check if user Id exists
        var userExists = _userService.UserExists(userid);
        if (!userExists)
        {
            return false;
        }

        MovementClasification clasification = new MovementClasification
        {
            MovementTypeId = movementypeid,
            Description = description,
            UserRegId = userid
        };

        _conn.Clasifications.Add(clasification);
        var lastId = _conn.SaveChanges();
        if(lastId > 0)
            return true;

        return false;
    }

    public bool Edit(int clasificationId, string newDescription)
    {
        //check if the clasification exists
        var clasification = _conn.Clasifications.Find(clasificationId);
        if(clasification == null)
            return false;

        clasification.Description = newDescription;
        _conn.SaveChanges();
        return true;
    }

    public bool Delete(int clasificationId)
    {
        var clasification = Clasifications.Find(cl => cl.Id == clasificationId);
        if(clasification == null)
            return false;

        Clasifications.RemoveAll(cl => cl.Id == clasificationId);
        return true;
    }

    //function to valid if the movement type (inversión, gastos o ingresos) id belongs to the movementType enum
    public bool IsMovementTypeValid(int id)
    {
        bool isValid = Enum.IsDefined(typeof(MovementType), id);
        return isValid;
    }

    //function to valid if the clasification id belongs to the user
    public bool ClasificationBelongToUser(int userId, int clasificationId)
    {
        var clasification = _conn.Clasifications.FirstOrDefault(clas => clas.Id == clasificationId && clas.UserRegId == userId);
        if(clasification != null)
            return true;

        return false;
    }
}