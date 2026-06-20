public class LoginService(UserService _us)
{

    //The ? sign is to tell that the method can return a null 
    public async Task<ResponseFormat<UserForResponseDTO?>> Login(AuthBase data)
    {
        var user = await _us.GetUser(data.Username, data.Pwd);

        //check if user is founded
        if (user == null) 
            return new ResponseFormat<UserForResponseDTO?>
            {
                Success = false,
                Message = "Usuario no encontrado",
                Data = null
            };

        return new ResponseFormat<UserForResponseDTO?>
        {
            Success = true,
            Message = "Usuario encontrado",
            Data = new UserForResponseDTO
            {
                UserId = user.Id,
                Username = user.Name,
                BD = user.BD,
                Amount = user.Amount
            }
        };
    }

    public async Task<ResponseFormat<UserForResponseDTO>> RegisterUser(RegisterUser data)
    {
        var user = await _us.Add(data.Username.Trim(), data.Pwd.Trim(), data.BD, data.Amount);
        return new ResponseFormat<UserForResponseDTO>
        {
            Success = true,
            Message = "Usuario creado correctamente",
            Data = new UserForResponseDTO
            {
                UserId = user.Id,
                Username = user.Name,
                BD = user.BD,
                Amount = user.Amount
            }
        };
    }
}