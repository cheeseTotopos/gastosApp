import { Flex } from "antd";
import AuthForm  from "../components/auth/AuthForm.tsx";

function LoginPage(){
    return(
        <Flex justify="center" style={{marginTop: 60}}>

            <AuthForm origin="login"/>

        </Flex>
    );
}

export default LoginPage;