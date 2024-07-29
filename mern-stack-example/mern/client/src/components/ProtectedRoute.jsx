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


  const { isLoading, isAuthDoctor, isAuthPharmacy, isAuthAdmin } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  if (isAuthDoctor) {
    return (
      <div className={`${styles['w-full']} ${styles['p-6']}`}>
        <GetDoctorPatients />
      </div>
    );
    
  } else if (isAuthPharmacy) {
    return (
      <div className={`${styles['w-full']} ${styles['p-6']}`}>
        <FindPrescription />
      </div>
    );
  }
    else if (isAuthAdmin) { //// to be removed !!!!!
    return (
      <div className={`${styles['w-full']} ${styles['p-6']}`}>
        <AdminPage />
      </div>
    );

  } else {
    return <LoginOrRegister />;
  }
};

export default ProtectedRoute;
