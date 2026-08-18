import { Splitter, Flex, Radio } from "antd";
import {useState} from "react";
import DisplayGraphSelection from "./displayGraphSelection";
import { useNavigate } from "react-router";

function QueryMovements(){

    const [selection, setSelection] = useState();

    type OptionType = {
        value: number,
        label: string,
        path: string
    };

    const radioOptions: OptionType[] = [
        {value: 1, label: "Gastos vs Ingresos", path: "exp_vs_inv"},
        {value: 2, label: "Gastos durante el año", path: "exp"},
        {value: 3, label: "Gastos por clasificacion", path: "exp_xclas"},
        {value: 4, label: "Top de clasificaciones", path: "top_clas"}
    ]

    const nav = useNavigate();

    const changeSelection = (e: any) =>{

        let selectedOption = radioOptions.find(
            option => option.value === e.target.value
        );

        const path = selectedOption?.path;
        console.log(path);
        setSelection(e.target.value);
        nav(`${path}`);
    }

    return (
        <Flex style={{marginTop: "20px", height: "45vw"}}>
            <Splitter>
                <Splitter.Panel min="20%" max="20%" collapsible>

                    <Flex justify="center" align="center" style={{height: "100%"}}>
                        <Radio.Group vertical value={selection} options={radioOptions} onChange={changeSelection}/>
                    </Flex>

                </Splitter.Panel>
                <Splitter.Panel>
                    <DisplayGraphSelection/>
                </Splitter.Panel>
            </Splitter>
        </Flex>
    );
}

export default QueryMovements;