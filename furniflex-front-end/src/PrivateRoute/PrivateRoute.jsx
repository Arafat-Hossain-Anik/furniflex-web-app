import { Navigate, } from "react-router-dom";
import { useApp } from "../Context/AppContext";


/* eslint-disable react/prop-types */
const PrivateRoute = ({ children }) => {
    const { user, loading } = useApp()
    if (loading) return <div className="d-flex align-items-center justify-content-center">
        <div className="spinner-border " role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
    // let ab = true
    if (user) {
        return children;
    }
    else return <Navigate to="/registration" replace={true}></Navigate>
};

export default PrivateRoute;