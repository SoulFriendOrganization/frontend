import { Navigate, Outlet, useLocation } from 'react-router';
import { isAuthenticated } from '../utils/authUtils';

function PrivateRoute() {
    const location = useLocation();
    
    if (!isAuthenticated()) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    return <Outlet />;
}

function PublicRoute({ restricted = false }) {
    const location = useLocation();
    const from = location.state?.from?.pathname || '/home';
    
    if (isAuthenticated() && restricted) {
        return <Navigate to={from} replace />;
    }
    
    return <Outlet />;
}

export { PrivateRoute, PublicRoute };
