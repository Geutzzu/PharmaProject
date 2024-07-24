import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import GetDoctorPatients from './GetDoctorPatients';
import FindPrescription from './FindPrescription';
import LoginOrRegister from './LoginOrRegister';
import styles from './ProtectedRoute.module.css';
import { Link } from 'react-router-dom';

const ProtectedRoute = () => {


  const { isLoading, isAuthDoctor, isAuthPharmacy } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  if (isAuthDoctor) {
    console.log("Doctor");
    return (
      <div className={`${styles['w-full']} ${styles['p-6']}`}>
        <GetDoctorPatients />
      </div>
    );
    
  } else if (isAuthPharmacy) {
    console.log("Pharmacy");
    return (
      <div className={`${styles['w-full']} ${styles['p-6']}`}>
        <FindPrescription />
      </div>
    );

    
  } else {
    return <LoginOrRegister />;
  }
};

export default ProtectedRoute;
