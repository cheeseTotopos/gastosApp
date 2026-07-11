import { Form, Input, Typography, Button} from "antd";
import { useState } from "react";
import { Link } from "react-router";

type props = {
    origin: "login" | "register"
};

function AuthForm({origin}: props){

    let title, url, urlText: string;
    let color: "cyan" | "purple";

    if(origin == "login"){
        title = "Login";
        url = "/register";
        color = "cyan";
        urlText = "¿Aún no eres usuario? Regístrate";
    } else {
        title = "Register";
        url = "/";
        color = "purple";
        urlText = "¿Ya tienes usuario? Inicia sesión";
    }

    //with use state we define a variable and a way to access to its value
    let [user, setUser] = useState({
        password: "",
        username: ""
    }); 

    //e is an event object that contains information about what happened
    function setUsername(e: any){
        setUser({...user, username: e.target.value});
    }

    function setPassword(e: any){
        setUser({...user, password: e.target.value});
    }

    return (
        
        //container div
        <div>
            <Typography style={{ textAlign: "center", paddingBottom: 20}}>{title}</Typography>
            <Form labelCol={{ span: 8 }} labelAlign="left">

                <Form.Item label="Usuario" name="username">
                    <Input onChange={setUsername}/>
                </Form.Item>

                <Form.Item label="Contraseña" name="pwd">
                    <Input.Password onChange={setPassword}/>
                </Form.Item>

                <Button block color={color} variant="solid" loading style={{marginBottom: 20}}>Submit</Button>

                <Link to={url}>
                
                    <Button block type="link">{urlText}</Button>
                </Link>

            </Form>
        </div>
    );
}

export default AuthForm;