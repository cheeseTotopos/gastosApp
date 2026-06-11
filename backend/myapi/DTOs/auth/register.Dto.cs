using System.ComponentModel.DataAnnotations;

public class RegisterUser: AuthBase
{
    [Required]
    [DataType(DataType.Date)]
    public DateOnly BD {get; set;}
    [Required]
    public decimal Amount {get; set;}
}