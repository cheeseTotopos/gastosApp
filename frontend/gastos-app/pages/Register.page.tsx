import AuthHeader from "../components/authComponents/AuthHeader";
import AuthForm from "../components/authComponents/AuthForm";
import styles from "./Auth.page.module.css";
import {Link} from "react-router";

function RegisterPage(){

    return(
        <div className={styles.authPageDiv}>

            <div className={styles.titleline}>

                <AuthHeader title = "Register" backgroundColor={"#FFFFFF"} mainColor = {"#F022F0"}/>   
            </div>
            <div className = {styles.form}>
                <AuthForm mode={"register"}/>
            </div>

            <div className={styles.redirection}>
                <Link to="/">¿Ya eres usuario? Inicia sesión</Link>
            </div>
        </div>
    )
}

export default RegisterPage;