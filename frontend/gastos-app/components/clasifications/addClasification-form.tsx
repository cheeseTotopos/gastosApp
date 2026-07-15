import {Form, Input, Select} from 'antd';

function AddClasificationForm(){

    const options = [
        {value: "1", label: "Gasto"},
        {value: "2", label: "Ingreso"}
    ];

    const labelWidth = 150;
    return(
        <Form>
            <Form.Item label="Descripción" name="description">
                <Input/>
            </Form.Item>
            <p style={{display: 'inline-block', marginRight: 10}}>Tipo de movimiento: </p>
            <Select options={options}></Select>
        </Form>
    );
}

export default AddClasificationForm;