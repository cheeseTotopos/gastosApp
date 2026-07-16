import axios  from "axios";

export async function getClasifications(){

    let path: string = "http://localhost:5018/clasifications/getclasifications";

    try {

        
        let response = await axios.post(
            path,
            {}, // body
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        
        return response;
    } catch (error) {
        return false;
    }
} 