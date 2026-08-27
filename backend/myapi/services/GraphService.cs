using System.Collections.Immutable;
using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;

public class GraphService(UserService _us, AppDBConection _conn, MovementClasificationService _cs)
{

    private string[] _months {get;} =
    [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    public async Task<ResponseFormat<ExpensesPerYearResponse?>> ExpensesPerYear(int userid, int year)
    {
        //verify if the user exists
        var user = await _us.UserExists(userid);
        if(user == null)
            return new ResponseFormat<ExpensesPerYearResponse?>
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

            where m.MovementDate.Year == year && m.MT == 1

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
        var result = Enumerable.Range(1, 12).Select(month => new ExpensesPerYearDto
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

        return new ResponseFormat<ExpensesPerYearResponse?>
        {
            Success = true,
            Message = "Clasificaciones por año obtenidas con éxito",
            Data = new ExpensesPerYearResponse{Clasifications = result}
        };
    }

    public async Task<ResponseFormat<List<InvExpResponseDto>?>> Invexp(int userid, int year)
    {
        //verify if the user exists
        var user = await _us.UserExists(userid);
        if(user == null)
            return new ResponseFormat<List<InvExpResponseDto>?>
            {
                Success = false,
                Message = "Usuario no encontrado",
                Data = null
            };

        //get the totals of invoices and expenses per month
        var totals = await (
            from clas in _conn.Clasifications
            where clas.UserRegId == user.Id

            join m in _conn.Movements
                on clas.Id equals m.ClasificationId

            where m.MovementDate.Year == year

            group m by new
            {
                clas.MovementTypeId,
                Month = m.MovementDate.Month
            }
            into g

            select new
            {
                UserId = user.Id,
                MT = g.Key.MovementTypeId,
                Month = g.Key.Month,
                Total = g.Sum(x => x.Amount)
            }
        ).ToListAsync();


        //order the query result into the nivo format
        var result = Enumerable.Range(1, 12).Select(month => new InvExpResponseDto
            {
                Month = _months[month - 1],
                Expenses = totals.Where(x => x.Month == month && x.MT == 1).Select(x => x.Total).FirstOrDefault(),
                Invoices = totals.Where(x => x.Month == month && x.MT == 2).Select(x => x.Total).FirstOrDefault()
            })
            .ToList();

        return new ResponseFormat<List<InvExpResponseDto>?>
        {
            Success = true,
            Message = "Gastos e ingresos obenidos correctamente",
            Data = result
        };
    }

    public async Task<ResponseFormat<FrequenciesGraphResponseDto?>> TopClasifications(int userid, int year)
    {
        //verify if the user exists
        var user = await _us.UserExists(userid);
        if(user == null)
            return new ResponseFormat<FrequenciesGraphResponseDto?>
            {
                Success = false,
                Message = "Usuario no encontrado",
                Data = null
            };

        //get the total amount for each clasification
        var totals = await _cs.GetUserClasificationsTotals(userid, year);
        var frequencies = await _cs.GetClasificationsFrequency(userid, year);

        if(totals.Data == null|| frequencies.Data == null)
            return new ResponseFormat<FrequenciesGraphResponseDto?>
            {
                Success = false,
                Message = "Datos obtenidos erroneamente",
                Data = null
            };

        return new ResponseFormat<FrequenciesGraphResponseDto?>
        {
            Success = true,
            Message = "Datos obtenidos correctamente",
            Data = new FrequenciesGraphResponseDto
            {
                Totals = totals.Data,
                Frequencies = frequencies.Data
            }
        };
    }
}