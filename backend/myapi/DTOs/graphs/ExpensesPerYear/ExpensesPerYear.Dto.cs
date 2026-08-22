public class ExpensesPerYearDto()
{
    public string Month {get; set;} = string.Empty;
    public Dictionary<string, decimal> Clasifications {get; set;} = null!;
}