import { Flex, Empty, Card, Form, Input, Tag} from "antd";

type Movement = {
    date: string | null;
    clasificationId: number | null;
    clasificationLabel: string;
    mt: number | null;
    mtLabel: string;
    description: string;
    amount: number | null;
    dummyId: number | null;
    color: string;
};

type props = {
    movements: Movement[];
    containerheight: string
}

function MovementsIconList({movements, containerheight}: props){

    if(movements.length == 0)
        return <Empty style={{height: containerheight}}/>;
    
    return(
        <Flex wrap style={{height: containerheight, overflowY: "auto",}} >
            {
                movements.map(x =>{

                    let mtlabel = x.mt == 1 ? "Gasto" : "Ingreso";
                    return <Card key={x.dummyId} size="small" title={x.clasificationLabel}>
                        <Form size="small">

                            <Tag color={x.mt == 1 ? "red" : "green"} variant="filled">{mtlabel}</Tag>

                            <Form.Item>
                                <Input value={x.date == null ? "" : x.date}/>
                            </Form.Item>

                            <Form.Item>
                                <Input value={x.amount == null ? "" : `$${x.amount}`} style={{fontWeight: "bold"}}/>
                            </Form.Item>
                        </Form>

                        <Form.Item>
                            <Input value={x.description == null ? "" : x.description}/>
                        </Form.Item>
                    </Card>;
                })
            }
        </Flex>
    );
}

export default MovementsIconList;