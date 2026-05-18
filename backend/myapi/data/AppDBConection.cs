using Microsoft.EntityFrameworkCore;

public class AppDBConection : DbContext
{
    //each DbSet is a table representation from our database. This is called an entity. So, an eitity is a table representation 
    //created from our model
    public DbSet<Movement> Movements {get; set;}
    public DbSet<MovementClasification> Clasifications {get; set;}
    public DbSet<User> Users {get; set;}

    //the base is to call the father constructor (DhContext Constructor) 
    public AppDBConection(DbContextOptions<AppDBConection> options):base(options)
    {
    }
        
    
}