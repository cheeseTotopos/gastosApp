using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

[Table("movementsclasifications")]
public class MovementClasification
{

    [Key]
    public int Id {get; set;}

    //in case the column from the db table have a different name
    [Column("MovementType")]
    public int MovementTypeId {set; get;}

    [Column("ClasName")]
    //this string.empty is for avoid warnings. We initialize them as a empty string
    public string Description {set; get;} = string.Empty;

    [ForeignKey("User")]
    public int UserRegId {get; set;}

    public MovementClasification()
    {
        
    }

    //This constructor was before the entitiy framework, for local object creation
    public MovementClasification(int id, int movementtypeId, string description, int userreg)
    {
        Id = id;
        MovementTypeId = movementtypeId;
        Description = description;
        UserRegId = userreg;
    }
}