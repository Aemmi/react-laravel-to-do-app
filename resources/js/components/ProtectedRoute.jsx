import react from 'react';
import {Navigate} from 'react-router-dom';
import {validateUser} from '../config/Auth';

const ProtectedRoute = ({ children }) => {
    const user = validateUser();

    if (!user) {
        return <Navigate to='/login' />
    }
    return children;
}

export default ProtectedRoute;
