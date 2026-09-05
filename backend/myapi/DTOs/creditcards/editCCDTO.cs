using System.ComponentModel.DataAnnotations;

public class EditCCDTO()
{
    [Required]
    public int CardId {get; set;}

    [Required]
    public string NewName {get; set;} = string.Empty;
}