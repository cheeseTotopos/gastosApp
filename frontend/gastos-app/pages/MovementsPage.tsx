import { Flex, Tabs } from "antd";
import type { TabsProps } from 'antd';
import { Outlet, useNavigate } from "react-router";

function MovementsPage(){

    const nav = useNavigate();
    let currentPath = location.pathname.split("/").pop();

    const items: TabsProps['items'] = [
    {
        key: 'add',
        label: 'Añadir movimientos',
        //children: <AddMovement/>,
    },
    {
        key: 'query',
        label: 'Consulta',
        //children: 'Content of Tab Pane 2',
    },
    ];

    const loadPage = (key: string) =>{
        nav(`${key}`);
    }

    return(
        <>
            <Flex justify="center" style={{marginTop: "15px"}}>
                <Tabs activeKey={currentPath} items={items} onChange={loadPage}/>
            </Flex>

            <Outlet/>
        </>
    );
}

export default MovementsPage;