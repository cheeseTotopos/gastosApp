import {Flex, Button, Radio} from "antd";
import { PoweroffOutlined } from '@ant-design/icons';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import { useNavigate } from "react-router";

function TopBar(){

    //useNavigate its not the function that navigates, its the function that return a function that navigates
    const navigate = useNavigate();

    //the radio options
    const navoptions: CheckboxGroupProps<string>['options'] = [
        { label: 'Clasificaciones', value: 'clasifications' },
        { label: 'Movimientos', value: 'movements' },
    ];

    const onChangePage = (e: any) =>{
        
        if(e.target.value == "movements")
            navigate("/movements");

        if(e.target.value == "clasifications")
            navigate("/home");
    }

    function logout(){
        //first, clean the localStorage cookie sesion
        localStorage.removeItem("token");
        navigate("/");
    }

    return(

        <Flex justify="space-between">
                
            <Button type="primary"
                    icon={<PoweroffOutlined/>}
                    color="danger"
                    variant="filled"
                    onClick={logout}
            >Cerrar sesión</Button>

            <Radio.Group
                block
                options={navoptions}
                defaultValue="clasifications"
                optionType="button"
                buttonStyle="solid"
                onChange={onChangePage}
            />

        </Flex>
    );
}

export default TopBar;