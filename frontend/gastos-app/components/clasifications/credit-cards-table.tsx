import { useEffect } from "react";
import { getCreditCards } from "../../services/Clasifications.service";

function CreditCardsTable(){

    useEffect(() =>{
        loadCreditCards();
    }, []);

    async function loadCreditCards(){
        let response = await getCreditCards();
    }

    return (
        <p>aki se mostrarán las tarjetas de credito ye</p>
    );
}

export default CreditCardsTable;