import { Navigate, } from "react-router-dom";
import { useApp } from "../Context/AppContext";


/* eslint-disable react/prop-types */
const PrivateRoute = ({ children }) => {
    const { user, loading } = useApp()
    if (loading) return <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
        <div className="spinner-border " role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
    if (user) {
        return children;
    }
    else return <Navigate to="/signup" replace={true}></Navigate>
};

export default PrivateRoute;