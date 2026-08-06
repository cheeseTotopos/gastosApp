using System.ComponentModel.DataAnnotations;

public class AddClasification
{
    [Required]
    public string Description {get; set;} = string.Empty;
    //movement type id (inversión, gasto o ingreso)
    [Required]
    public int MT {get; set;}

    public string Color {get; set;} = string.Empty;
}