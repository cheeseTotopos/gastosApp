using System.ComponentModel.DataAnnotations;

public class ExpensesPerYearRequest()
{
    [Required]
    public int Year {get; set;}
}