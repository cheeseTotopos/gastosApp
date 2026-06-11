import axios from "axios";

export async function userAuth(username: string, pwd: string, mode: any){

    let route = (mode == "register") ? "http://localhost:5018/auth/register" : "http://localhost:5018/auth/login";
    console.log(route);
    const response = await axios.post(route, {username, pwd});
    return response.data;
}