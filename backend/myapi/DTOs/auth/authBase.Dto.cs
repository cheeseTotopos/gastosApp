/*
    this class is ment to be extend by all auth DTOs, because all DtOs need the two base params:
        *username
        *pwd
*/
using System.ComponentModel.DataAnnotations;

public class AuthBase
{
    [Required]
    public string Username {get; set;} = string.Empty;
    [Required]
    public string Pwd {get; set;} = string.Empty;
}