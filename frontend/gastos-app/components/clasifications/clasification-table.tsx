import {Card, Button, Empty, Typography} from "antd";

type movementclasification = {
    clasificationId: number,
    clasification: string,
    mt: 1 | 2 | 3,
    color: string
};

type props = {
    clasarray : movementclasification[]
}

function ClasificationsTable({clasarray}: props){

    if(clasarray.length == 0){
        return (
            <Empty description={<Typography.Text>Sin clasificaciones</Typography.Text>}></Empty>
        );
    }

    return (
        <Card>
            {
                clasarray.map(x => {
                    
                    const gridstyle: React.CSSProperties = {
                        textAlign: 'center',
                        fontSize: "bold",
                        color: "white",
                        backgroundColor: `${x.color}`
                    };

                    return <Card.Grid style={gridstyle} key={x.clasificationId}> 
                        {x.clasification}
                        <div>
                            <Button type="text" variant="text" color="primary">...</Button>
                        </div>
                        </Card.Grid>
                })
            }
        </Card>
    );
}

export default ClasificationsTable;