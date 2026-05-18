public class AddClasification
{
    public int UserId {get; set;}
    public string Description {get; set;} = String.Empty;
    
    //movement type id (inversión, gasto o ingreso)
    public int MT {get; set;}
}