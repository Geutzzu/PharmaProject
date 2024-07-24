// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthDoctor, setIsAuthDoctor] = useState(false);
  const [isAuthPharmacy, setIsAuthPharmacy] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const [doctorResponse, pharmacyResponse] = await Promise.all([
          axios.get('http://localhost:5050/auth/check/doctor', { withCredentials: true }),
          axios.get('http://localhost:5050/auth/check/pharmacy', { withCredentials: true }),
        ]);

        setIsAuthDoctor(doctorResponse.data.loggedIn);
        setIsAuthPharmacy(pharmacyResponse.data.loggedIn);
      } catch (error) {
        console.error('Error checking auth status', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading, isAuthDoctor, isAuthPharmacy }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
