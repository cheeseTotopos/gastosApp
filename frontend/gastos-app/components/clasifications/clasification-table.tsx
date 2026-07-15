import {Card, Button} from "antd";

type movementclasification = {
    id: string,
    description: string,
    mt: 1 | 2 | 3
};

type props = {
    movarray : movementclasification[]
}

function ClasificationsTable({movarray}: props){

    const gridstyle: React.CSSProperties = {
    textAlign: 'center',
    };

    return (
        <Card>
            {
                movarray.map(x => {
                    return <Card.Grid style={gridstyle}> 
                        {x.description }
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