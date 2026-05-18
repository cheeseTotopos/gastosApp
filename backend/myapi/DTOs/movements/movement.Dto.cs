public class MovementBase
{
    public DateOnly Date {get; set;}
    public int MT {get; set;}
    public decimal Amount {get; set;}
    public string Description {get; set;} = String.Empty;
    public int UserId {get; set;}
    public int ClasificationId {get; set;}
}