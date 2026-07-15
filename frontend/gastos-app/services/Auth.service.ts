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

export async function register(username: string, pwd: string, amount:number, bd: string){

    let route = "http://localhost:5018/auth/register";

    try {
        
        const response = await axios.post(route, {username, pwd, bd, amount});
        return response.data;
    } catch (error) {
        return false;
    }
}