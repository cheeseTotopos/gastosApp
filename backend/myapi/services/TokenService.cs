using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

public class TokenService()
{
    
    //this method gets the userId within the ClaimsPrincipal on the jwt token. (ClaimsPrincipal is the class that contains the claims on the user token (like userid, username, etc))
    public int GetUserId(ClaimsPrincipal user)
    {
        return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)!.Value);
    }
}