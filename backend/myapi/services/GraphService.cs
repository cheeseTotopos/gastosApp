using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;

public class GraphService(UserService _us, AppDBConection _conn)
{

    private string[] _months {get;}= new[]
    {
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    };
    public async Task<ResponseFormat<ExpensesPerYearDto?>> ExpensesPerYear(int userid, int year)
    {
        //verify if the user exists
        var user = await _us.UserExists(userid);
        if(user == null)
            return new ResponseFormat<ExpensesPerYearDto?>
            {
                Success = false,
                Message = "Usuario no encontrado",
                Data = null
            };

        //get the movements totals ORDERED BY date
        var totals = await (
            from clas in _conn.Clasifications
            where clas.UserRegId == user.Id

            join m in _conn.Movements
                on clas.Id equals m.ClasificationId

            where m.MovementDate.Year == year

            group m by new
            {
                clas.Id,
                clas.Description,
                clas.MovementTypeId,
                clas.Color,
                Month = m.MovementDate.Month
            }
            into g

            select new GetMovementsTotal
            {
                UserId = user.Id,
                Username = user.Name,
                ClasificationId = g.Key.Id,
                Clasification = g.Key.Description,
                MT = g.Key.MovementTypeId,
                Color = g.Key.Color,
                Month = g.Key.Month,
                Total = g.Sum(x => x.Amount)
            }
        ).ToListAsync();

        //order the query result into the nivo format
        var result = Enumerable.Range(1, 12).Select(month => new
            {
                Month = _months[month - 1],

                Clasifications = totals
                    .Where(x => x.Month == month)
                    .ToDictionary(
                        x => x.Clasification,
                        x => x.Total
                    )
            })
            .ToList();

        return new ResponseFormat<ExpensesPerYearDto?>
        {
            Success = true,
            Message = "Clasificaciones por año obtenidas con éxito",
            Data = result//in heeeeeeeeeeeeere. The result must be an array of the format "Month:string" and "Clasifications" 
        };
    }
}