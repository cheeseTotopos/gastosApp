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

export async function apiAddClasification(mt: 1 | 2, description: string, color: string){
    let path = "http://localhost:5018/clasifications/add";

    try {
        let response = await axios.post(
            path,
            {Description: description, MT: mt, Color: color}, // body
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        
        return response;
    } catch (error) {
        
    }
}

export async function getCreditCards(){
    let path = "http://localhost:5018/creditcards/getcreditcards";

    let response = await axios.post(
        path,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

    console.log(response.data.data);
    return response.data.data;
}