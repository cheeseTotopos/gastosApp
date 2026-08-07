import {Splitter} from "antd";
import TopBar from "../components/general/TopBar.tsx";
import { Outlet } from "react-router";

function Layout(){
    
    return(
        <Splitter vertical style={{ height: "100vh" }}>

            <Splitter.Panel collapsible min="7%" max="7%" defaultSize="7%" >
                <TopBar></TopBar>
            </Splitter.Panel>

            <Splitter.Panel>
                <Outlet/>
            </Splitter.Panel>

        </Splitter>
    );
}

export default Layout;