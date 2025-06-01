import Cookies from 'js-cookie'
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

function Middleware({ children , type}) {
    const navigate = useNavigate();    
    const jwtToken = Cookies.get('token')

    useEffect(() => {
        if(type === "need-login" && !jwtToken) {
            navigate('/login');
        }

        if(type === "no-need-login" && jwtToken) {
            navigate('/home');
        }
    }, [jwtToken, type, navigate]);
  
    return children;
}

export default Middleware;