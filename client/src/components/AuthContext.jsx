// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthDoctor, setIsAuthDoctor] = useState(false);
  const [isAuthPharmacy, setIsAuthPharmacy] = useState(false);
  const [isAuthAdmin, setIsAuthAdmin] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const [doctorResponse, pharmacyResponse, adminResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/auth/check/doctor`, { withCredentials: true }),
          axios.get(`${import.meta.env.VITE_API_URL}/auth/check/pharmacy`, { withCredentials: true }),
          axios.get(`${import.meta.env.VITE_API_URL}/auth/check/admin`, { withCredentials: true }),
        ]);

        setIsAuthDoctor(doctorResponse.data.loggedIn);
        setIsAuthPharmacy(pharmacyResponse.data.loggedIn);
        setIsAuthAdmin(adminResponse.data.loggedIn);

        /// if not logged in, redirect to login page
        if (!doctorResponse.data.loggedIn && !pharmacyResponse.data.loggedIn && !adminResponse.data.loggedIn) {
          navigate('/');
        }

        console.log(doctorResponse.data.loggedIn);
        console.log(pharmacyResponse.data.loggedIn);
        console.log(adminResponse.data.loggedIn);
      } catch (error) {
        console.error('Error checking auth status', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
        await axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`, { withCredentials: true });
        alert("Logged out successfully!");
        setIsAuthDoctor(false);
        setIsAuthPharmacy(false);
        setIsAuthAdmin(false);
        navigate('/');
    } catch (err) {
        console.error('Logout failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthDoctor, isAuthPharmacy, isAuthAdmin, isLoading, handleLogout }}>
        {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
