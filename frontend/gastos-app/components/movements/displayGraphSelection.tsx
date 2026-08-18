import { Flex, DatePicker } from "antd";
import { Outlet } from "react-router";

function DisplayGraphSelection(){
    return(
        <Flex align="center" vertical>
            <Flex style={{marginBottom: "30px"}}>
                <DatePicker placeholder="Inicio"></DatePicker>
                <DatePicker placeholder="Final"></DatePicker>
            </Flex>

            <Outlet></Outlet>
        </Flex>
    );
}

export default DisplayGraphSelection;