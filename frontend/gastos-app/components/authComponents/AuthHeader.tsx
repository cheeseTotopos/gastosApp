import styles from  "./AuthHeader.module.css";

//ts give us a way to declare our own datatype. So, in this example, headerprop is an object that MUST have the following properties
type headerprop = {
    title: string,
    backgroundColor: string,
    mainColor: string
    //optionalprops? = string
    //uniontypes = "typeone" | "typetwo" | "typethree"
};


//props are the arguments that a react component recieve. PROPS ARE ALWAY OBJECTS, thats the way react works
function AuthHeader(props: headerprop/*props: {title: string}*/){

    //this is a way to extract properties from an object and asignate them to variables with the exact name
    //const {title} = props;
    return (
        
        <div className = {styles.container} style={{backgroundColor: props.mainColor}}>

            <div style={{backgroundColor: props.backgroundColor}} className={styles.rightDiv}></div>
            <div style={{backgroundColor: props.mainColor}} className={styles.middleDiv}>{props.title}</div>
            <div style={{backgroundColor: props.backgroundColor}} className={styles.leftDiv}></div>
            
        </div>
    )
}

export default AuthHeader;