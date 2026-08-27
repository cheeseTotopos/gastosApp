import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {getInvoicesVSExpensesData} from "../../services/Graph.service";
import {type InvexpData} from "../../services/Graph.service";
import { ResponsiveBar } from '@nivo/bar';

function InvoicesVSExpenses(){

    //the data from the outlet (in this case the year)
    type GraphContext = {
        yearSelected: number
    };
    const {yearSelected} = useOutletContext<GraphContext>();
    const [data, setData] = useState<InvexpData[]>([]);
    const navigate = useNavigate();

    //everytime the user change the year, the graph will re-render
    useEffect(()=>{
        async function loadData(){
            let response: InvexpData[] = await getInvoicesVSExpensesData(yearSelected);

            if(response.length > 0){
                setData(response);
            } else {
                setData([]);
                localStorage.removeItem("token");
                navigate("/");
            }
        }

        loadData();
    }, [yearSelected]);

    return (
        <ResponsiveBar
            data={data}
            keys={["invoices", "expenses"]}
            indexBy="month"
            labelSkipWidth={12}
            labelSkipHeight={12}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    translateX: 120,
                    itemsSpacing: 3,
                    itemWidth: 100,
                    itemHeight: 16
                }
            ]}
            axisBottom={{ legend: 'month (indexBy)', legendOffset: 32 }}
            axisLeft={{ legend: 'gastos', legendOffset: -40 }}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        />
    );
}

export default InvoicesVSExpenses;