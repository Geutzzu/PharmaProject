import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import GetDoctorPatients from './GetDoctorPatients';
import FindPrescription from './FindPrescription';
import LoginOrRegister from './LoginOrRegister';
import AdminPage from './admin/AdminPage';
import styles from './ProtectedRoute.module.css';
import { Link } from 'react-router-dom';

const ProtectedRoute = () => {


  const { isLoading, isAuthDoctor, isAuthPharmacy } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  if (isAuthDoctor) {
    return (
        <GetDoctorPatients />
    );
    
  } else if (isAuthPharmacy) {
    return (
        <FindPrescription />
    );
  } else {
    return <LoginOrRegister />;
  }
};

export default ProtectedRoute;
