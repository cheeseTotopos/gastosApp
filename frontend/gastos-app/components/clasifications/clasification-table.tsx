import {Card, Button, Empty, Typography, Modal} from "antd";
import { useState } from "react";

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

    const [openModal, setOpenModal] = useState(false);

    const editClasification = () =>{
        setOpenModal(true);
    };

    if(clasarray.length == 0){
        return (
            <Empty description={<Typography.Text>Sin clasificaciones</Typography.Text>}></Empty>
        );
    }

    return (
        <>
            <Modal open={openModal} onCancel={() => setOpenModal(false)}>
                <p>ola</p>
            </Modal>
            <Card>
                {
                    clasarray.map(x => {
                        //console.log(x);
                        const gridstyle: React.CSSProperties = {
                            textAlign: 'center',
                            fontSize: "bold",
                            color: "white",
                            backgroundColor: `${x.color}`
                        };

                        return <Card.Grid style={gridstyle} key={x.clasificationId}> 
                            {x.clasification}
                            <div>
                                <Button type="text" variant="text" color="primary" onClick={editClasification}>...</Button>
                            </div>
                            </Card.Grid>
                    })
                }
            </Card>
        </>
    );
}

export default ClasificationsTable;