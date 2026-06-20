using System.ComponentModel.DataAnnotations;

public class ClasificationListDTO
{
    [Required]
    public int UserId {get; set;}

    public int? MT {get; set;}
}