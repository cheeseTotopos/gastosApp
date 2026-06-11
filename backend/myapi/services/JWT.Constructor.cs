
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;/*For symmetric security key*/

/*
    The parentesis after the name class is syntax sugar, its a short way to make
    dependency injection. Its the same like doing this:

    public class TokenConstructor
    {
        
        private readonly _configuration;
        
        public TokenConstructor(IConfiguration configuration)
        {
            _configuration = conofiguration;
        }
    }

    The Iconfiguration its a .net core interface that allow us to access the configuration settings from our project in a 
    key-value pair format.
*/

public class TokenConstructor(IConfiguration conf)
{
    
    /*Declaring the method that will return the token*/
    public string TokenGenerator(User data)
    {
        //in here we access to our jwt secret using the conf object
        string? secretKey = conf["jwt"];
        if (secretKey == null)
            throw new Exception("JWT Key not configured");

        /*
            Encode the key with standar UTF8, then we create a symetricKey.
            SimetricKey work making a key, keeping on server, and sending a token copy to the client. Then the client send the
            key, and if it matches with the key on memmory server, then the client can access to server services
        */
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

        var signed = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        //claims are the data that the token will coitain
        //what claims must be on the token? JUST the necessary to indentifie the user
        var claims = new[]
        {
            //arguments for a claim are: meaning or context the value, value
            new Claim(JwtRegisteredClaimNames.Sub, data.Id.ToString()),//sub is for an id
            new Claim(JwtRegisteredClaimNames.UniqueName, data.Name)
        };

        var rawToken = new JwtSecurityToken(
            issuer: "http://myapi",
            audience: "http://myfrontend", 
            claims: claims,
            expires: DateTime.Now.AddMinutes(10),
            signingCredentials: signed
        );

        var token = new JwtSecurityTokenHandler().WriteToken(rawToken);

        return token;
        
    }
}