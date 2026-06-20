using System.ComponentModel;
using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;

public class MovementClasificationService(UserService _us, AppDBConection _conn)
{
    public async Task<ResponseFormat<MovementClasification?>> Add(AddClasification data)
    {
        //check if user exists
        var user = await _us.UserExists(data.UserId);
        if (user == null)
            return new ResponseFormat<MovementClasification?>
            {
                Success = false,
                Message = "El usuario no pudo ser encontrado",
                Data = null
            };

        //check if movement clasification exists
        bool movementValid = IsMovementTypeValid(data.MT);
        if(movementValid == false)
            return new ResponseFormat<MovementClasification?>
            {
                Success = false,
                Message = "El tipo de movimiento no es válido",
                Data = null
            };

        //check if the clasification name already exists
        bool nameAlreadyExist = await UserClasificationAlreadyExists(data.Description.Trim(), data.UserId);
        if(nameAlreadyExist == true)
            return new ResponseFormat<MovementClasification?>
            {
                Success = false,
                Message = "La clasificación " + data.Description.Trim() + " ya existe",
                Data = null
            };
        MovementClasification clasification = new MovementClasification
        {
            MovementTypeId = data.MT,
            Description = data.Description.Trim(),
            UserRegId = data.UserId
        };

        await _conn.Clasifications.AddAsync(clasification);
        await _conn.SaveChangesAsync();

        return new ResponseFormat<MovementClasification?>
        {
            Success = true,
            Message = "Clasificación creada con éxito",
            Data = clasification
        };
    }

    public async Task<ResponseFormat<MovementClasification?>>Edit(EditClasification data)
    {
        //check if the user exists
        var user = await _us.UserExists(data.UserId);
        if (user == null)
            return new ResponseFormat<MovementClasification?>
            {
                Success = false,
                Message = "El usuario no pudo ser encontrado",
                Data = null
            };
        //check if the clasification exists and belongs to user
        var belongs = await ClasificationBelongToUser(data.UserId, data.ClasificationId);
        if(belongs == false)
            return new ResponseFormat<MovementClasification?>
            {
                Success = false,
                Message = "La clasificacion no pertenece al usuario",
                Data = null
            };

        //check if the name its not repeated
        var repeated = await UserClasificationAlreadyExists(data.NewDescription.Trim(), data.UserId);
        if(repeated == true)
            return new ResponseFormat<MovementClasification?>
            {
                Success = false,
                Message = "No se ha detectado ningún cambio",
                Data = null
            };

        //get the clasification to edit the description.
        var clasification = await GetMovementClasification(data.ClasificationId);
        if(clasification == null)
            return new ResponseFormat<MovementClasification?>
            {
                Success = false,
                Message = "No fue encontrada esta clasificación",
                Data = null
            };

        var oldDescription = clasification.Description;

        clasification.Description = data.NewDescription.Trim();
        await _conn.SaveChangesAsync();

        return new ResponseFormat<MovementClasification?>
        {
            Success = true,
            Message = "Clasificación '" + oldDescription + "' cambiada a '" + data.NewDescription.Trim() + "' correctamente",
            Data = clasification
        };
    }

    /*public bool Delete(int clasificationId)
    {
        var clasification = Clasifications.Find(cl => cl.Id == clasificationId);
        if(clasification == null)
            return false;

        Clasifications.RemoveAll(cl => cl.Id == clasificationId);
        return true;
    }*/

    //function to valid if the movement type (inversión, gastos o ingresos) id belongs to the movementType enum
    public bool IsMovementTypeValid(int id)
    {
        bool isValid = Enum.IsDefined(typeof(MovementType), id);
        return isValid;
    }

    //function to valid if the clasification id belongs to the user
    public async Task<bool> ClasificationBelongToUser(int userId, int clasificationId)
    {
        var clasification = await _conn.Clasifications.FirstOrDefaultAsync(clas => clas.Id == clasificationId && clas.UserRegId == userId);
        if(clasification != null)
            return true;

        return false;
    }

    public async Task<bool> UserClasificationAlreadyExists(string clasname, int userid)
    {
        bool exists = await _conn.Clasifications.AnyAsync(c => c.Description == clasname && c.UserRegId == userid);
        return exists;
    } 

    public async Task<MovementClasification?> GetMovementClasification(int clasId)
    {
        var clas = await _conn.Clasifications.FirstOrDefaultAsync(c => c.Id == clasId);
        return clas;
    }

    //I put a random rumber to initialize mt, because 0 is already a mt
    public async Task<ResponseFormat<List<ClasificationListResponseDTO>?>> GetUserClasifications(ClasificationListDTO data)
    {
        //if mt its sended by the user, check if its a valid mt
        if(data.MT != null)
        {
            bool validMT = IsMovementTypeValid(data.MT.Value);
            if(validMT == false)
                return new ResponseFormat<List<ClasificationListResponseDTO>?>
                {
                    Success = false,
                    Message = "El tipo de movimiento no es válido",
                    Data = null
                };
        }

        //check if user exists
        var user = await _us.GetUserById(data.UserId);
        if(user == null)
            return new ResponseFormat<List<ClasificationListResponseDTO>?>
                {
                    Success = false,
                    Message = "El Usuario no fue encontrado",
                    Data = null
                };

        var clasifications = await (from mov in _conn.Clasifications
                                where mov.UserRegId == data.UserId
                                orderby mov.MovementTypeId
                                select new ClasificationListResponseDTO
                                {    
                                    Id = mov.Id, 
                                    MovemetType = mov.MovementTypeId,
                                    Description = mov.Description
                                }).ToListAsync();

        return new ResponseFormat<List<ClasificationListResponseDTO>?>
        {
            Success = true,
            Message = "Clasificaciones obtenidas con éxito",
            Data = clasifications
        };
    }
}