import styles from "./AuthForm.module.css";


function AuthForm(){
    return (
        <div className = {styles.container}>
            <form action="miurl" name="authForm" className={styles.form}>

                <label className={styles.userlabel}>Nombre de usuario</label>
                <input type="text" className={styles.userinput}/>

                <label className={styles.pwdlabel}>Contraseña</label>
                <input type="text" className={styles.pwdinput}/>

            </form>
        </div>
    )
}

export default AuthForm;