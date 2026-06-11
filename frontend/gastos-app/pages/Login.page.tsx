import AuthHeader from "../components/authComponents/AuthHeader";
import AuthForm from "../components/authComponents/AuthForm";
import styles from "./Auth.page.module.css";
import { Link } from "react-router";

function LoginPage(){

    return(
        <div className={styles.authPageDiv}>

            <div className={styles.titleline}>

                <AuthHeader title = "Login" backgroundColor={"#FFFFFF"} mainColor = {"#5B4CA1"}/>   
            </div>
            <div className = {styles.form}>
                <AuthForm />
            </div>

            <div className={styles.redirection}>
                <Link to="/register">¿Aún no eres usuario? Regístrate</Link>
            </div>
        </div>
    )
}

export default LoginPage;