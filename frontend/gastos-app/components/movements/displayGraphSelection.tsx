import { Flex, Input, Menu } from "antd";
import type { MenuProps } from 'antd';

import { useState } from "react";
import { Outlet } from "react-router";


type DisplayGraphSelectionProps = {
    disableYearBtn: number | undefined;
};


function DisplayGraphSelection({disableYearBtn}: DisplayGraphSelectionProps){

    const [yearSelected, setYearSelected] = useState("");

    type MenuItem = Required<MenuProps>['items'][number];

    const items: MenuItem[] = [
        {
            key: "years",
            label: "Año",
            children: [
                {key: "2026", label: "2026"},
                {key: "2027", label: "2027"},
                {key: "2028", label: "2028"},
            ]
        }
    ];

    const selectYear: MenuProps['onClick'] = (e) => {
        setYearSelected(e.key);
    };


    return(
        <Flex align="center" vertical>
            <Flex style={{marginBottom: "30px"}}>
                <Input placeholder="Seleccione año  --->" disabled value={yearSelected}/>
                <Menu items={items} onClick={selectYear} disabled={disableYearBtn == undefined ? true : false}/>
            </Flex>

            <Flex style={{height: "400px", width: "90%"}}>

                <Outlet context={{yearSelected}}></Outlet>
            </Flex>
        </Flex>
    );
}

export default DisplayGraphSelection;