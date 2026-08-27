using System.ComponentModel.DataAnnotations;

public class GraphRequest()
{
    [Required]
    public int Year {get; set;}
}