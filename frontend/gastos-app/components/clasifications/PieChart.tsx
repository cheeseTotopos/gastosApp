import { ResponsivePie } from '@nivo/pie';

type clasTypes = {
    clasification: string;
    clasificationId: number;
    mt: 1 | 2;
    total: number;
    userId: number;
    username: string;
    color: string;
};

type props = {
    clasifications: clasTypes[]
};

function PieChart({clasifications}: props){
    
    const pieData = clasifications.map(x => {
        return {
            "id": x.clasification,
            "label": x.clasification,
            "value": x.total,
            "color": x.color
        }
    });


    return (
        <ResponsivePie /* or Pie for fixed dimensions */
            data={pieData}
            colors={{datum: "data.color"}}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.6}
            cornerRadius={2}
            activeOuterRadiusOffset={8}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            /*legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    translateY: 56,
                    itemWidth: 100,
                    itemHeight: 18,
                    symbolShape: 'circle'
                }
            ]}*/
        />
    );
}

export default PieChart;