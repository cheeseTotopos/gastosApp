type buttonProps = {
    text: string | number,
    className?: string,
    type?: string
};

function GeneralButton({text, className, type}: buttonProps){

    return (
        <button className={`${className || ""}`} type = "submit">
            {text}
        </button>
    );
}

export default GeneralButton;