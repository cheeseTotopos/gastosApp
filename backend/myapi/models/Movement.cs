using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

//this is because the db table name is different
[Table("movements")]
public class Movement
{
    [Key]
    public int Id {get; set;}
    public DateOnly MovementDate {get; set;}
    public int MT{get; set;}
    public decimal Amount {get; set;}

    //this is in case the table column doesnt have the same name as this code property. 
    [Column("MovementDescription")]
    //this string.empty is for avoid warnings. We initialize them as a empty string
    public string Description {get; set;} = string.Empty;
    public int UserId {get; set;}
    
    [ForeignKey("MovementClasification")]
    public int ClasificationId {get; set;}

    public Movement()
    {
        
    }

    //This constructor was before the entitiy framework, for local object creation
    public Movement(int id, DateOnly date, int mt, decimal amount, string description, int userid, int clasificationId)
    {
        Id = id;
        MovementDate = date;
        MT = mt;
        Amount = amount;
        Description = description;
        UserId = userid;
        ClasificationId = clasificationId;
    }
}