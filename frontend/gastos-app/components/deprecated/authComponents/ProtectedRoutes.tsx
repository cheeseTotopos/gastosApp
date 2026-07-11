import { Navigate } from "react-router";

type Props = {

    //React node are all coponents or elements that react can render. children is a special react word to indicate react that 
    //its within CONTENT, unlike props, that, yes, are within the componente, but are NOT COMPONENTS, are DATA
    children: React.ReactNode;
};

function ProtectedRoute({ children }: Props){

    const token = localStorage.getItem("token");

    if(!token){

        //why not using useNavigate? The Navigate component is for CONDITIONAL RENDERS, unlike the useNavigate
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;