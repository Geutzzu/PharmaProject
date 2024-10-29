import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import LoginAdmin from './LoginAdmin';
import AdminPage from './AdminPage';
import styles from '../ProtectedRoute.module.css';
import { Link } from 'react-router-dom';

const ProtectedAdmin = () => {


  const { isLoading, isAuthAdmin } = useAuth();

  console.log("isAuthAdmin", isAuthAdmin);

  if (isLoading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

    else if (isAuthAdmin) { //// to be removed !!!!!
    return (
      <div className={`${styles['w-full']} ${styles['p-6']}`}>
        <AdminPage />
      </div>
    );
  } else {
    return <LoginAdmin />;
  }
};

export default ProtectedAdmin;
