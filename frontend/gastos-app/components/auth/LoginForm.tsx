import { Form, Input, Typography, Button, Modal} from "antd";
import { useState } from "react";
import { login } from "../../services/Auth.service";
import { Link, useNavigate } from "react-router";

function AuthForm(){

    //with use state we define a variable and a way to access to its value
    let [user, setUser] = useState({
        password: "",
        username: ""
    }); 

    let [errorModal, contextHolder] = Modal.useModal();

    let nav = useNavigate();
    
    let title, url, urlText: string;
    let color: "cyan" | "purple";


    title = "Login";
    url = "/register";
    color = "cyan";
    urlText = "¿Aún no eres usuario? Rgístrate!";
    


    //e is an event object that contains information about what happened
    function setUsername(e: any){
        setUser({...user, username: e.target.value});
    }

    function setPassword(e: any){
        setUser({...user, password: e.target.value});
    }

    function buildModalConfig(message: string){
        return {
            title: "Error",
            content: (
                <>
                    <p>{message}</p>
                </>
            )
        };
    }

    async function onclick(){
  
        //validate that the username and the password are not empty
        if(user.password == "" || user.username == ""){
            let modalConfig = buildModalConfig("El usuario y contraseña no pueden ser vacíos");
            errorModal.error(modalConfig);
            return;
        }

        const response = await login(user.username, user.password);

        //if response its unauthorized or a badrequest
        if(!response){
            let modalConfig = buildModalConfig("Usuario o contraseña incorrectos");
            errorModal.error(modalConfig);
            return;
        }
        
        localStorage.setItem("token", response.token);
        nav("/home");
    }

    return (
        
        //container div
        <div>

            <Typography style={{ textAlign: "center", paddingBottom: 20}}>{title}</Typography>
            <Form labelCol={{ span: 8 }} labelAlign="left" initialValues={{ remember: true }}>

                <Form.Item label="Usuario" name="username" rules={[{required: true}]}>
                    <Input onChange={setUsername}/>
                </Form.Item>

                <Form.Item label="Contraseña" name="pwd" rules={[{required: true}]}>
                    <Input.Password onChange={setPassword}/>
                </Form.Item>

                <Button block color={color} variant="solid" style={{marginBottom: 20}} onClick={onclick}>Submit</Button>
                {contextHolder}

                <Link to={url}>
                
                    <Button block type="link" >{urlText}</Button>
                </Link>
                

            </Form>
        </div>
    );
}

export default AuthForm;