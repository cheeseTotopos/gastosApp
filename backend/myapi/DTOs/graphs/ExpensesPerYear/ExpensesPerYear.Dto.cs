public class ExpensesPerYearDto()
{
    public string Month {get; set;} = string.Empty;
    public IEnumerable<GetMovementsTotal> Clasifications {get; set;} = null!;
}