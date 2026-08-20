public class GetMovementsTotal
{
    public int UserId {get; set;}
    public string Username {get; set;} = string.Empty;
    public int ClasificationId {get; set;}
    public string Clasification {get; set;} = string.Empty;
    public int MT {get; set;}
    public decimal Total {get; set;}
    public string? Color {get; set;}
    public int? Month {get; set;}
}