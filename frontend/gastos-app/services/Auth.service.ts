import axios from "axios";

export async function login(username: string, pwd: string){

    let route = "http://localhost:5018/auth/login";

    try {
        
        const response = await axios.post(route, {username, pwd});
        return response.data;
    } catch (error) {
        return false;
    }
}

type userreg = {
    username: string, 
    pwd: string, 
    amount:number, 
    bd: string
};

export async function register(user: userreg){

    let route = "http://localhost:5018/auth/register";

    try {
        
        const response = await axios.post(route, 
            {
                Username: user.username,
                Pwd: user.pwd,
                BD: user.bd,
                Amount: user.amount
            });

        return response.data;
    } catch (error) {
        return false;
    }
}