import { Flex } from "antd";
import RegisterForm  from "../components/auth/RegisterForm.tsx";

function RegisterPage(){
    return(
        <Flex justify="center" style={{marginTop: 60}}>

            <RegisterForm />

        </Flex>
    );
}

export default RegisterPage;