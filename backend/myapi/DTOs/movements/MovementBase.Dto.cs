using System.ComponentModel.DataAnnotations;

public class MovementBase
{
    [Required]
    [DataType(DataType.Date)]
    public DateOnly Date {get; set;}
    [Required]
    public int MT {get; set;}
    [Required]
    public decimal Amount {get; set;}
    [Required]
    public string Description {get; set;} = String.Empty;
    [Required]
    public int UserId {get; set;}
    [Required]
    public int ClasificationId {get; set;}
}