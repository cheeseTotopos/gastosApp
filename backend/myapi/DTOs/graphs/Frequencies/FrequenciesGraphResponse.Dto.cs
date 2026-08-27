public class FrequenciesGraphResponseDto
{
    public ClasificationsTotalResponse Totals {get; set;} = null!;
    public List<FrequienciesResponseDto> Frequencies {get; set;} = null!;
}