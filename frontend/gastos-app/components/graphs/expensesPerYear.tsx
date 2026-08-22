import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExpensesPerYearData } from "../../services/Graph.service";

import { ResponsiveBar } from '@nivo/bar'

function ExpensesPerYear(){

    type GraphContext = {
        yearSelected: number
    };

    type ExpenseData = {
        month: string;
        [classification: string]: string | number;
    };

    const [data, setData] = useState<ExpenseData[]>([]);
    const [keys, setKeys] = useState<string[]>([]);
    
    const {yearSelected} = useOutletContext<GraphContext>();
    useEffect(()=>{
        
        async function loadData() {
            const response = await getExpensesPerYearData(yearSelected);

            setData(response);

            if (response.length > 0) {
                setKeys(
                    Object.keys(response[0])
                        .filter(key => key !== "month")
                );
            } else {
                setKeys([]);
            }
        }
        loadData();

    }, [yearSelected]);

    return (
        <ResponsiveBar
            data={data}
            keys={keys}
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

export default ExpensesPerYear;