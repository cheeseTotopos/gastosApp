# Changes description

### API ENDPOINTS REDISIGN

#### Changes on login
**Context**  
What it was used to do, is that when doing login, the API used to response with the user information (including user id and the token). When the front recieve that information
the application traveled to home page, and need to re-send the user id for getting the home page information (like the user clasifications, amount). This because its not recomended
to set into localstorage important data like a user id, a array of objects, etc.

**Solution**  
So this change resolves that. Now, the only answer that we get is the token. Now, when travelling to home page, we send that token to the api, and the api uses the token to
get the userid **(because the token id was built with a sub claim)**. So the front never have such a important information as the user id.

* **Token service.cs** is the service that recieve the user claims and return the userid