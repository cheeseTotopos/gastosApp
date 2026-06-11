using System.ComponentModel.DataAnnotations;

public class EditClasification
{
    [Required]
    public int ClasificationId {get; set;}
    [Required]
    public int UserId {get; set;}
    [Required]
    public string NewDescription {get; set;} = String.Empty;
}