using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("creditcards")]
public class CreditCard()
{
    [Key]
    public int Id {get; set;}

    [ForeignKey("User")]
    public int UserId {get; set;}
    public string CardName {get; set;} = string.Empty;
    public DateOnly CreationDate {get; set;}

    [Column("IsActive")]
    public bool Active {get; set;}
    public DateOnly? DeletedAt {get; set;}
}