/*
    this class is ment to be extend by all auth DTOs, because all DtOs need the two base params:
        *username
        *pwd
*/

public class AuthBase
{
    public string Username {get; set;} = string.Empty;
    public string Pwd {get; set;} = string.Empty;
}