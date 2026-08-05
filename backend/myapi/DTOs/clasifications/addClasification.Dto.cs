using System.ComponentModel.DataAnnotations;

public class AddClasification
{
    [Required]
    public string Description {get; set;} = String.Empty;
    //movement type id (inversión, gasto o ingreso)
    [Required]
    public int MT {get; set;}
}