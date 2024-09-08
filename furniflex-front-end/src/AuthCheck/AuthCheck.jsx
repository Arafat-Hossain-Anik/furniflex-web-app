import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../Context/AppContext';


// eslint-disable-next-line react/prop-types
const AuthCheck = ({ children }) => {
    const { user, loading } = useApp();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user) {
            navigate('/'); // Navigate to the home page if the user is authenticated
        }
    }, [user, loading, navigate]);

    // If loading, you can return a loading spinner or message
    if (loading) {
        return <div className="d-flex align-items-center justify-content-center">
            <div className="spinner-border " role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    return <>{children}</>; // Render the children if not loading
};

export default AuthCheck;
