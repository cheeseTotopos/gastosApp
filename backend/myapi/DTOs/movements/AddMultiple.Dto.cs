using System.ComponentModel.DataAnnotations;

public class AddMultiple
{
    [Required]
    public IEnumerable<MovementBase> Movements {get; set;} = [];
}