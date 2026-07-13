public class GetMovementTotalResponse
{
    public int UserId {get; set;}
    public string Username {get; set;} = string.Empty;
    public decimal UserAmount {get; set;}
    public IEnumerable<GetMovementsTotal> GroupedMovemets {get; set;} = [];
}