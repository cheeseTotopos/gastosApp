import { Flex } from "antd";
import AuthForm  from "../components/auth/LoginForm.tsx";

function LoginPage(){
    return(
        <Flex justify="center" style={{marginTop: 60}}>

            <AuthForm/>

        </Flex>
    );
}

export default LoginPage;