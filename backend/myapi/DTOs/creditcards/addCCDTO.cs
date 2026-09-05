using System.ComponentModel.DataAnnotations;

public class AddCCDTO()
{
    [Required]
    public string CardName {get; set;} = string.Empty;
}