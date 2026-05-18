import AuthHeader from "../components/authComponents/AuthHeader";
import AuthForm from "../components/authComponents/AuthForm";
import styles from "./Auth.page.module.css";

function AuthPage(){

    return(
        <div className={styles.authPageDiv}>

            <div className={styles.titleline}>

                <AuthHeader title = "Login" backgroundColor={"#FFFFFF"} mainColor = {"#5B4CA1"}/>   
            </div>
            <div className = {styles.form}>
                <AuthForm />
            </div>
        </div>
    )
}

export default AuthPage;