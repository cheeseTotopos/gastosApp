import { Form, Input, Typography, Button, Modal, InputNumber, DatePicker} from "antd";
import type {InputNumberProps, DatePickerProps} from "antd";
import { useState } from "react";
import { register } from "../../services/Auth.service";
import { Link, useNavigate } from "react-router";


function RegisterForm(){

    //with use state we define a variable and a way to access to its value
    let [user, setUser] = useState({
        pwd: "",
        confirmpwd: "",
        username: "",
        amount: 0.0,
        bd: "0001-01-01"
    });

    let [errorModal, contextHolder] = Modal.useModal();

    let nav = useNavigate();
    
    let title, url, urlText: string;
    let color: "cyan" | "purple";

    title = "Register";
    url = "/";
    color = "purple";
    urlText = "¿Ya tienes usuario? Inicia sesión";
    


    //e is an event object that contains information about what happened
    function setUsername(e: any){
        setUser({...user, username: e.target.value});
    }

    function setPassword(e: any){
        setUser({...user, pwd: e.target.value});
    }

    function setPasswordBackup(e:any){
        setUser({...user, confirmpwd: e.target.value});
    }

    const setAmount: InputNumberProps["onChange"] = (amount) =>{
        setUser({...user, amount: Number(amount) || 0});
    };

    const setBD: DatePickerProps["onChange"] = (bd) =>{
        setUser({...user, bd: bd && !Array.isArray(bd)? bd.format("YYYY-MM-DD"): "0001-01-01"});
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
        if(user.pwd == "" || user.confirmpwd == "" || user.username == "" || user.bd == "0001-01-01"){
            let modalConfig = buildModalConfig("Llene todos los campos");
            errorModal.error(modalConfig);
            return;
        }

        //if confirmpwd and the pwd are not the same
        if(user.pwd != user.confirmpwd){
            let modalConfig = buildModalConfig("La contraseña y el confirmar contraseña no coinciden");
            errorModal.error(modalConfig);
            return;
        }

        const response = await register(user);
        
        localStorage.setItem("token", response.token);
        nav("/home");
    }

    return (
        
        //container div
        <div>

            <Typography style={{ textAlign: "center", paddingBottom: 20}}>{title}</Typography>
            <Form labelCol={{ span: 12 }} wrapperCol={{ span: 16 }} labelAlign="left" initialValues={{ remember: false }} >

                <Form.Item label="Usuario" name="username" rules={[{required: true}]}>
                    <Input onChange={setUsername}/>
                </Form.Item>

                <Form.Item label="Contraseña" name="pwd" rules={[{required: true}]}>
                    <Input.Password onChange={setPassword}/>
                </Form.Item>

                <Form.Item label="Confirmar contraseña" name="pwdbackup" rules={[{required: true}]}>
                    <Input.Password onChange={setPasswordBackup}/>
                </Form.Item>

                <Form.Item label="Fecha de nacimiento" name="bd" rules={[{required: true}]}>
                    <DatePicker onChange={setBD}></DatePicker>
                </Form.Item>

                <Form.Item label="Monto" name="amount" rules={[{required: true}]}>
                    <InputNumber onChange={setAmount} defaultValue={0.0}/>
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

export default RegisterForm;