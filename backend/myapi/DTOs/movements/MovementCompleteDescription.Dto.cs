public class MovementsCompleteDescription()
{
    public int MT {get; set;}
    public int ClasificationId {get; set;}
    public string ClasificationDescription {get; set;} = string.Empty;
    public int MovementId {get; set;}
    public decimal MovementAmount {get; set;}
    public string MovementDescription {get; set;} = string.Empty; 
}