import axios from "axios";

type Movement = {
    date: string | null;
    clasificationId: number | null;
    clasificationLabel: string;
    mt: number | null;
    mtLabel: string;
    description: string;
    amount: number | null;
    dummyId: number | null;
    color: string
};

type movements2send = {
    Date: string | null;
    ClasificationId: number | null;
    MT: number | null;
    Description: string;
    Amount: number | null;
};

export async function getClasificationsOptions(){

    type clastype = {
        clasification: string,
        clasificationId: number,
        color: string,
        mt: number,
        total: number,
        userId: number,
        username: string
    };

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
        
        let options = response.data.data.clasifications.map((x: clastype) =>{
            return {
                value: x.clasification,
                id: x.clasificationId,
                mt: x.mt,
                color: x.color
            };
        });

        return options;
    } catch (error) {
        return false;
    }
} 

export async function addClasifications(movements: Movement[]){

    let movementsarray: movements2send[] = movements.map(x =>{

        let mov: movements2send = {
            Date: x.date,
            ClasificationId: x.clasificationId,
            MT: x.mt,
            Description: x.description,
            Amount: x.amount,
        };

        return mov;
    });

    let path: string = "http://localhost:5018/movements/addMany";

    try {
        
        let response = axios.post(
            path,
            {Movements: movementsarray},
            {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            }
        );
        return response;
        
    } catch (error) {
        return false;
    }
}