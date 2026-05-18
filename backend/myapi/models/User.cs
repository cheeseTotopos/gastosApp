using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

[Table("users")]
public class User
{
    [Key]
    public int Id{get; set;}

    //this is because the column from the db table have a different name
    [Column("UserName")]

    //this string.empty is for avoid warnings. We initialize them as a empty string
    public string Name { get; set; } = string.Empty;
    public string Pwd { get; set; } = string.Empty;
    public DateOnly BD { get; set; }
    public decimal Amount {get; set;}

    public User()
    {
        
    }

    //This constructor was before the entitiy framework, for local object creation
    /*public User(int id, string name, string pwd, DateOnly bd, decimal amount)
    {
        Id = id;
        Name = name;
        Pwd = pwd;
        BD = bd;
        Amount = amount;
    }*/
}