import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await axios.get('http://localhost:5050/auth/logout', { withCredentials: true });
                alert("Logged out successfully!");
                // redirect or update the state to reflect that the user is logged out
                navigate('/');
            } catch (err) {
                console.error('Logout failed:', err);
            }
        };

        handleLogout();
    }, [navigate]);

    return null;
};

export default Logout;