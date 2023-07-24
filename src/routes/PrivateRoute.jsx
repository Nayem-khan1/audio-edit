import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    
    if(user && user.uid){
        return children;
    }

    return <Navigate to="/"></Navigate>
};

export default PrivateRoute;