import { Flex, Typography, Divider, Table, Tag} from "antd";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

import {getTopClasificationsData} from "../../services/Graph.service";
import type {TopClasData} from "../../services/Graph.service";
import type { TableColumnsType } from "antd";

function TopClasifications(){

    const { Title } = Typography;

    type GraphContext = {
        yearSelected: number
    };
    const {yearSelected} = useOutletContext<GraphContext>();
    const [data, setData] = useState<TopClasData>();

    //configuration for tables
    interface AmountsType {
        key: React.Key;
        clasification: string;
        total: number;
    };
    interface FrequenciesType {
        key: React.Key;
        clasification: string;
        count: number;
    };

    const columnsForAmounts: TableColumnsType<AmountsType> =[
        {
            title: "MT", 
            dataIndex: "mt",
            render(value) {
                let color = value == 1 ? "magenta" : "green";
                let text = value == 1 ? "Gasto" : "Ingreso";
                return <Flex> <Tag variant="outlined" color={color}>{text}</Tag></Flex>
            },
        },
        {title: "Clasificación", dataIndex: "clasification"},
        {title: "Monto total", dataIndex: "total"}
    ];

    const columnsForFrequencies: TableColumnsType<FrequenciesType> =[
        {
            title: "MT", 
            dataIndex: "mt",
            render(value) {
                let color = value == 1 ? "magenta" : "green";
                let text = value == 1 ? "Gasto" : "Ingreso";
                return <Flex> <Tag variant="outlined" color={color}>{text}</Tag></Flex>
            },
        },
        {title: "Clasificación", dataIndex: "clasification"},
        {title: "Cantidad", dataIndex: "count"}
    ];

    useEffect(()=>{

        async function loadData(){
            let response:TopClasData = await getTopClasificationsData(yearSelected);
            setData(response);
        }

        loadData();
    }, [yearSelected]);
    return (
            <Flex justify="space-around" style={{width: "100%"}}>
                <Flex vertical>
                    <Title level={5}>Montos</Title>
                    <Divider/>
                    <Table<AmountsType>
                        rowSelection={{type: "radio"}}
                        columns={columnsForAmounts}
                        dataSource={data == undefined? []: data.totals}
                    />
                </Flex>

                <Flex vertical>
                    <Title level={5}>Frequencias</Title>
                    <Divider/>
                    <Table<FrequenciesType>
                        rowSelection={{type: "radio"}}
                        columns={columnsForFrequencies}
                        dataSource={data == undefined? []: data.frequencies}
                    />
                </Flex>
            </Flex>
    );
}

export default TopClasifications;