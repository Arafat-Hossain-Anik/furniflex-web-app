import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../Context/AppContext';


// eslint-disable-next-line react/prop-types
const AuthCheck = ({ children }) => {
    const { user, loading, products } = useApp();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && products) {
            navigate('/');
        }
    }, [user, navigate, products]);

    if (loading) {
        return <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <div className="spinner-border " role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    return <>{children}</>;
};

export default AuthCheck;
