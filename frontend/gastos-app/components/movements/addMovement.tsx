import { Flex, Card, Form, Input, DatePicker, AutoComplete, Button, InputNumber, Popconfirm, Tag, notification} from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import type {InputNumberProps, DatePickerProps} from "antd";
import dayjs from "dayjs";
import {getClasificationsOptions} from "../../services/Movements.service";
import MovementsIconList from "./movementsIconList";

import { addClasifications } from "../../services/Movements.service";


function AddMovement(){

    type Movement = {
        date: string | null;
        clasificationId: number | null;
        clasificationLabel: string;
        mt: number | null;
        mtLabel: string;
        description: string;
        amount: number | null;
        dummyId: number | null;
        color: string
    };

    type ClasOptions = {
        value: string,
        id: number,
        mt: number,
        color: string
    };

    const [movement, movementSetter] = useState<Movement>({
        date: null,
        clasificationId: null,
        clasificationLabel: "",
        mt: null,
        mtLabel: "",
        description: "",
        amount: null,
        dummyId: null,
        color: ""
    });

    const [options, optionsSetter] = useState<ClasOptions[]>();

    //const [paymentOptions, paymentOptionsSetter] = useState

    const [disablebtn, disablebtnSetter] = useState(true);

    const [openPopConfirm, openPopConfirmSetter] = useState(false);

    const [movementsArray, setMovementsArray] = useState<Movement[]>([]);

    const [expensesSummatory, expensesSummatorySetter] = useState(0);

    const [invoicesSummatory, invoicesSummatorySetter] = useState(0);

    const [loading, setLoading] = useState(false);

    const nav = useNavigate();

    const [notificationbuilder, contextholder] = notification.useNotification();


    async function loadClasifications(){
    
        const response = await getClasificationsOptions();
        
        if(response){
            optionsSetter(response);
        }
        else {
            localStorage.removeItem("token");
            nav("/");
        }
    }

    //get the clasifications for the options
    useEffect(() =>{
        loadClasifications();
    }, []);

    //disable the add movement btn if any input of the form is empty
    useEffect(() =>{
        (movement.date == null || movement.clasificationId == null || movement.amount == null || movement.description == "" || movement.mt == null) ?
            disablebtnSetter(true) : disablebtnSetter(false);

    }, [movement.date, movement.clasificationId, movement.amount, movement.description, movement.mt]);


    const setDate: DatePickerProps["onChange"] = (dt) =>{
        movementSetter({...movement, date: dt && !Array.isArray(dt)? dt.format("YYYY-MM-DD"): "0000-00-00"});
    }

    const setAmount: InputNumberProps["onChange"] = (value) => {
        movementSetter({...movement, amount: Number(value)});
    }

    const setDescription = (e: any) => {
        movementSetter({...movement, description: e.target.value});
    }

    const onSelectClasification = (label: string, option: ClasOptions) =>{
        
        movementSetter({
            ...movement,
            mt: option.mt,
            mtLabel: option.mt === 1 ? "Gasto" : "Ingreso",
            clasificationId: option.id,
            clasificationLabel: label,
            color: option.color
        });
    }

    //clear the values, except the date, so that the user can keep adding movements more confortable
    const clearFormValues = () =>{
        movementSetter({
            ...movement, 
            clasificationId: null,
            clasificationLabel: "",
            mt: null,
            mtLabel: "",
            description: "",
            amount: null,
            dummyId: null,
            color: ""
        });
    }

    const onAddMovement = () =>{
        const newMovement = {
            ...movement,
            dummyId: movementsArray.length
        };

        if(movement.amount != null)
            movement.mt == 1 ? expensesSummatorySetter(expensesSummatory+movement.amount) : invoicesSummatorySetter(invoicesSummatory+movement.amount);

        setMovementsArray(prev => [...prev,newMovement]);
        clearFormValues();
    }

    const actions: React.ReactNode[] = [
        <Button onClick={onAddMovement} disabled={disablebtn}>Añadir</Button>
    ];

    const showPopConfirm = () =>{
        openPopConfirmSetter(true);
    }

    const openNotification = () =>{
        notificationbuilder["success"]({
            title: "Operación realizada con éxito",
            description: "Los movimientos se registraron correctamente en la base de datos"
        });
    }

    const closePop = () =>{
        openPopConfirmSetter(false);
    }

    async function sendMovements(){

        setLoading(true);
        try {
            let response = await addClasifications(movementsArray);
        } finally {
            setLoading(false);
            openPopConfirmSetter(false);
            openNotification();
            movementsArray.length = 0;
        }
    }


    return(
        <>
            {contextholder}
            <Flex style={{marginTop: "30px"}} align="center" justify="space-around">
        
                <Card style={{marginTop: "40px", backgroundColor: "#F7F7F7", width: "300px"}} actions={actions}>

                    <Form labelCol={{ span: 11 }} labelAlign="left">
                        <Form.Item label="Fecha">
                            <DatePicker onChange={setDate} value={movement.date ? dayjs(movement.date) : null}></DatePicker>
                        </Form.Item>

                        <Form.Item label = "Clasificación">
                            <AutoComplete options={options} onSelect={onSelectClasification} value={movement.clasificationLabel}></AutoComplete>
                        </Form.Item>

                        <Form.Item label = "MT">
                            <Input disabled value={movement.mtLabel}/>
                        </Form.Item>

                        <Form.Item label="Monto">
                            <InputNumber onChange={setAmount} value={movement.amount}/>
                        </Form.Item>

                        <Form.Item label="Forma de pago">
                            <AutoComplete options={options} onSelect={onSelectClasification} value={movement.clasificationLabel}></AutoComplete>
                        </Form.Item>

                        <Form.Item label="Descripción">
                            <Input onChange={setDescription} value={movement.description}/>
                        </Form.Item>
                    </Form>

                </Card>

                <Flex style={{width: "60%"}} vertical>
                    
                    <Flex style={{marginBottom: "10px"}}>
                        {
                            //if theres any movement, then render the elements
                            (movementsArray.length > 0) && 
                            (
                                <Flex style={{width: "100%"}} justify="space-between">
                                    <Popconfirm title="Añadir estos movimientos los registrará en la base de datos" onConfirm={sendMovements} open={openPopConfirm} onCancel={closePop} okButtonProps={{ loading: loading }}>
                                        <Button color="blue" variant="solid" onClick={showPopConfirm}>Registrar movimientos</Button>
                                    </Popconfirm>
                                    <Flex gap={"large"}>
                                        <Tag color="red" variant="solid">Gastos: ${expensesSummatory}</Tag>
                                        <Tag color="green" variant="solid">Ingresos: ${invoicesSummatory}</Tag>
                                    </Flex>
                                </Flex>
                            )
                        }
                    </Flex>
                    <MovementsIconList movements={movementsArray} containerheight={"310px"}/>
                </Flex>

            </Flex>
        </>
    );
}

export default AddMovement;