import styles from "./AuthForm.module.css";
import GeneralButton from "../general/GeneralButton";
import { useState } from "react";
import {userAuth} from "../../services/Auth.service.ts";
import {useNavigate } from "react-router";

type option = {
    mode? : string
}

function AuthForm({mode}: option){

    let [user, setUser] = useState({
        username: "",
        pwd: ""
    });

    const nav = useNavigate();

    const userInput = (e: any) => {
        setUser({...user, username: e.target.value});
    }

    const pwdInput = (e: any) => {
        setUser({...user, pwd: e.target.value});
    }

    async function auth(e: any){
        e.preventDefault();
        
        let {username, pwd} = user;
        if(username == "" || pwd == "") return;
        console.log("mode en register "+mode);
        try { 
            
            let token = await userAuth(username, pwd, mode);

            //save the token on the navigator
            localStorage.setItem("token", token.token);
            nav("/home");

        } catch (error) {
            alert("Usuario no autorizado");
        }

    }

    return (
        <div className = {styles.container}>
            <form name="authForm" className={styles.form} onSubmit={auth}>

                <label className={styles.userlabel}>Nombre de usuario</label>
                <input type="text" className={styles.userinput} name="user" onChange={userInput} value={user.username}/>

                <label className={styles.pwdlabel}>Contraseña</label>
                <input type="text" className={styles.pwdinput} name="pwd" onChange={pwdInput} value={user.pwd}/>

                <GeneralButton text = {"Enviar"} className= {styles.button}/>
            </form>
        </div>
    )
}

export default AuthForm;