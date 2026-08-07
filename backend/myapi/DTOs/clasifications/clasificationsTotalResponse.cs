public class ClasificationsTotalResponse
{
    public decimal UserAmount {get; set;}
    public IEnumerable<GetMovementsTotal> Clasifications {get; set;} = null!;
}