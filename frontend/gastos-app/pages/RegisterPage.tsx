import { Flex } from "antd";
import AuthForm  from "../components/auth/AuthForm.tsx";

function RegisterPage(){
    return(
        <Flex justify="center" style={{marginTop: 60}}>

            <AuthForm origin="register"/>

        </Flex>
    );
}

export default RegisterPage;