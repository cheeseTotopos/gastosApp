using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

public class MovementDate
{
    [Required]
    public int UserId{get; set;}
    
    [Required]
    [DataType(DataType.Date)]
    public DateOnly InitDate {get; set;}

    [DataType(DataType.Date)]
    public DateOnly? FinalDate {get; set;}
}