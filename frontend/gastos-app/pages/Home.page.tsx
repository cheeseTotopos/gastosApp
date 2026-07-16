import { Flex, Button, Radio, Input, Modal } from "antd";
import { PoweroffOutlined } from '@ant-design/icons';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

import ClasificationsTable from "../components/clasifications/clasification-table";
import AddClasificationForm from "../components/clasifications/addClasification-form";

import {getClasifications} from "../services/Clasifications.service";

function HomePage(){

    const [openAddModal, setOpenAddModal] = useState(false);
    const [clasifications, setClasifications] = useState([]);
    
    useEffect(()=>{
        async function loadClassifications(){

            const response = await getClasifications();
            console.log(response);
            if(response)
                setClasifications(response.data.data);
        }

        loadClassifications();
    }, []);

    //the radio options
    const navoptions: CheckboxGroupProps<string>['options'] = [
        { label: 'Clasificaciones', value: 'clasifications' },
        { label: 'Movimientos', value: 'movements' },
    ];

    //useNavigate its not the function that navigates, its the function that return a function that navigates
    const navigate = useNavigate();

    function logout(e: any){
        //first, clean the localStorage cookie sesion
        localStorage.removeItem("token");
        navigate("/");
    }

    function onOpenAddModal(){
        setOpenAddModal(true);
    };

    const onCloseAddModal = () =>{
        setOpenAddModal(false);
    };

    return (
        <Flex justify="center" vertical gap="large">
            
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
                />

            </Flex>

            <span>grafico del dinero</span>

            <Flex justify="center" gap={"small"}>
                <Input.Search placeholder="Categoría" style={{ width: 200 }}/>
                <Button type="default"  color="purple" onClick={onOpenAddModal}>Añadir categoría</Button>
                <Modal title="Añadir clasificación" open={openAddModal} onCancel={onCloseAddModal}>
                    <AddClasificationForm/>
                </Modal>
            </Flex>

            <Flex justify="center" gap={"large"}>

                <ClasificationsTable clasarray = {clasifications} />
                
            </Flex>
        </Flex>
    );
}

export default HomePage;