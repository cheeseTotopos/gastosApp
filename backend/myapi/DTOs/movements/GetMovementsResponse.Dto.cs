public class GetMovementsResponse
{
    public int UserId {get; set;}
    public string UserName {get; set;} = string.Empty;
    public decimal UserAmount {get; set;}
    public IEnumerable<MovementsCompleteDescription> Movements {get; set;} = [];
}