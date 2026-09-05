using Microsoft.EntityFrameworkCore;

public class CreditCardService(UserService _us, AppDBConection _conn)
{
    public async Task<ResponseFormat<CreditCard?>> Add(int userid, string cardname)
    {
        //check if userExists
        var user = await _us.UserExists(userid);
        if(user == null)
            return new ResponseFormat<CreditCard?>
            {
                Success = false,
                Message = "Usuario no encontrado",
                Data = null
            };

        //check if credit card name is not repeated
        var cardExists = await RepeatedDescription(userid, cardname);
        if(cardExists == null)
            return new ResponseFormat<CreditCard?>
                {
                    Success = false,
                    Message = "Esta tarjeta de crédito ya existe",
                    Data = null
                };

        //create the object for the credit card
        CreditCard card = new CreditCard
        {
            UserId = userid,
            CardName = cardname.Trim(),
            CreationDate = DateOnly.FromDateTime(DateTime.Today),
            Active = true,
            DeletedAt = null,
        };

        await _conn.CreditCards.AddAsync(card);
        await _conn.SaveChangesAsync();

        return new ResponseFormat<CreditCard?>
                {
                    Success = true,
                    Message = "Tarjeta registrada correctamente",
                    Data = card
                };

    }

    public async Task<ResponseFormat<CreditCard?>> EditCreditCard(int userid, int cardid, string newname)
    {
        //check if userExists
        var user = await _us.UserExists(userid);
        if(user == null)
            return new ResponseFormat<CreditCard?>
            {
                Success = false,
                Message = "Usuario no encontrado",
                Data = null
            };

        //check if the credit card exists
        var card = await CreditCardExist(cardid);
        if(card == null)
            return new ResponseFormat<CreditCard?>
                {
                    Success = false,
                    Message = "No existe una tarjeta de crédito con esta descripción",
                    Data = null
                };

        //the description cannot be the same
        if(card.CardName == newname.Trim())
            return new ResponseFormat<CreditCard?>
                {
                    Success = false,
                    Message = "El nombre de la tarjeta de crédito es el mismo",
                    Data = null
                };

        string oldname = card.CardName;
        card.CardName = newname.Trim();
        await _conn.SaveChangesAsync();

        return new ResponseFormat<CreditCard?>
        {
            Success = true,
            Message = "El nombre de la tarjeta de credito '" + oldname + "' ahora es '" + newname + "'",
            Data = card
        };
    }

    //changes the active status of the credit card to the oposite status
    public async Task<ResponseFormat<CreditCard?>> ChangeActiveStatus(int userid, int cardid)
    {
        //check if userExists
        var user = await _us.UserExists(userid);
        if(user == null)
            return new ResponseFormat<CreditCard?>
            {
                Success = false,
                Message = "Usuario no encontrado",
                Data = null
            };

        //check if the credit card exists
        var card = await CreditCardExist(cardid);
        if(card == null)
            return new ResponseFormat<CreditCard?>
            {
                Success = false,
                Message = "No existe esta tarjeta de crédito",
                Data = null
            };

        //if card active status is 1, set the deleted date
        if (card.Active == true)
        {
            card.DeletedAt = DateOnly.FromDateTime(DateTime.Today);
        }

        card.Active = !card.Active;
        await _conn.SaveChangesAsync();
        return new ResponseFormat<CreditCard?>
        {
            Success = true,
            Message = "Tarjeta de crédito desactivada correctamente",
            Data = card
        };
    }

    //check if the credit card exists. Searched by id
    private async Task<CreditCard?> CreditCardExist(int cardid)
    {
        var card = await _conn.CreditCards.FirstOrDefaultAsync(x => x.Id == cardid);

        return card;
    }

    //check if the cardname does not already exists for the user. Search by the userid and the cardname
    private async Task<CreditCard?> RepeatedDescription(int userId, string cardname)
    {
        var card = await _conn.CreditCards.FirstOrDefaultAsync(x => x.UserId == userId && x.CardName == cardname);
        return card;
    }

    public async Task<ResponseFormat<List<CreditCard>?>> GetUserCC(int userid)
    {
        //check if userExists
        var user = await _us.UserExists(userid);
        if(user == null)
            return new ResponseFormat<List<CreditCard>?>
            {
                Success = false,
                Message = "Usuario no encontrado",
                Data = null
            };

        var ccs = await _conn.CreditCards.Where(x => x.UserId == userid).ToListAsync();
        return new ResponseFormat<List<CreditCard>?>
        {
            Success = true,
            Message = "Tarjetas de crédito obtenidas correctamente",
            Data = ccs
        };
    }
}