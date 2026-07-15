import axios  from "axios";

export async function getClasifications(userId: string){

    let path: string = "http://localhost:5018/clasifications/getclasifications";

    try {
        
        let response = await axios.post(path, {userId});
        return response;
    } catch (error) {
        return false;
    }
} 