import { Flex, Button, Input, Modal, Form, Select, ColorPicker, Typography } from "antd";
import type { ColorPickerProps } from "antd";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

import ClasificationsTable from "../components/clasifications/clasification-table";
import PieChart from "../components/clasifications/PieChart";

import {getClasifications} from "../services/Clasifications.service";
import {apiAddClasification} from "../services/Clasifications.service";

function HomePage(){

    type clasificationFromUseEffect = {
        clasification: string;
        clasificationId: number;
        mt: 1 | 2;
        total: number;
        userId: number;
        username: string;
        color: string;
    };

    const nav = useNavigate();

    const [openAddModal, setOpenAddModal] = useState(false);
    const [userAmount, setUserAmount] = useState<number>();
    const [clasifications, setClasifications] = useState<clasificationFromUseEffect[]>([]);
    
    type Classificaton = {
        mt: 1 | 2 | null;
        description: string
    };

    //the clasification object for creating a new clasification
    const [clasification, setClasification] = useState<Classificaton>({
        mt: null,
        description: ""
    });

    const [addClasColor, setAddClasColor] = useState<string | null>("");

    const options = [
        {value: 1, label: "Gasto"},
        {value: 2, label: "Ingreso"}
    ];

    const {Title} = Typography;
    
    useEffect(()=>{

        loadClassifications();
    }, []);

    async function loadClassifications(){

        const response = await getClasifications();
        
        if(response){
            setClasifications(response.data.data.clasifications);
            setUserAmount(response.data.data.userAmount);
        }
        else {
            localStorage.removeItem("token");
            nav("/");
        }
    }

    const selectMT = (value: 1 | 2) =>{
        setClasification({...clasification, mt : value});
    };

    //function to change the description of the new clasification
    const changeClasDescription = (e: any) =>{
        setClasification({...clasification, description : e.target.value});
    };


    function onOpenAddModal(){
        setOpenAddModal(true);
    };

    const onCloseAddModal = () =>{

        setClasification({description : "", mt : null});
        setOpenAddModal(false);
        setAddClasColor(null);
    };

    const changeAddclasColor: ColorPickerProps["onChange"] = (color) => {
        setAddClasColor(color.toHexString());
    };

    const [errorModal,  contextHolder] = Modal.useModal();
    async function addClasification(){
        
        if(clasification.mt == null){
            errorModal.error({title: "Error", content: <p>Seleccione un tipo de movimiento</p>});
            return;
        }
        if(clasification.description == ""){
            errorModal.error({title: "Error", content: <p>La descripción no puede ser vacía</p>});
            return;
        }

        if(addClasColor == "" || addClasColor == null){
            errorModal.error({title: "Error", content: <p>Seleccione un color para la clasifición</p>});
            return;
        }
    
        //check if the name of the new clasification does not already exists
        let duplicatedName: boolean = clasifications.some(x => clasification.description == x.clasification);
        if(duplicatedName){
            errorModal.error({title: "Error", content: <p>Ya existe una clasificación con este nombre</p>});
            return;
        }
        
        
        let response = await apiAddClasification(clasification.mt, clasification.description, addClasColor);
        if(response){

            onCloseAddModal();
            loadClassifications();
        }
    };


    return (
        <Flex justify="center" vertical gap="large">
            

            <Flex justify="center">
                <Title level={4}>Dinero actual: {userAmount}</Title>
            </Flex>

            <div style={{height: 300}}>
                <PieChart clasifications={clasifications}></PieChart>
            </div>


            <Flex justify="center" gap={"small"}>
                <Input.Search placeholder="no hace la busqueda :v" style={{ width: 200 }}/>
                <Button type="default"  color="purple" onClick={onOpenAddModal}>Añadir clasificación</Button>
                <Modal title="Añadir clasificación" open={openAddModal} onCancel={onCloseAddModal} onOk={addClasification}>

                    <Form labelCol={{span: 10}} labelAlign='left'>
                        <Form.Item label="Tipo de movimiento">
                            <Select options={options} onChange={selectMT} value={clasification.mt}></Select>
                        </Form.Item>
                        
                        <Form.Item label="Descripción">
                            <Input onChange={changeClasDescription} value={clasification.description}/>
                        </Form.Item>

                        <Form.Item label = "Color de la clasificación">
                            <ColorPicker value={addClasColor} onChange={changeAddclasColor}></ColorPicker>
                        </Form.Item>
                        
                    </Form>

                </Modal>
                {contextHolder}
            </Flex>

            <Flex justify="center" gap={"large"}>

                <ClasificationsTable clasarray = {clasifications} />
                
            </Flex>
        </Flex>
    );
}

export default HomePage;