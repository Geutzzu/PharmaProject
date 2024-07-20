import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, Link } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios if not already done
import LoginOrRegister from './LoginOrRegister';
import GetDoctorPatients from './GetDoctorPatients';
import styles from './ProtectedRoute.module.css';

const ProtectedRoute = () => {

  /* -- For debugging purposes only --
  useEffect(() => {
    const checkCookie = async () => {
      try {
        const response = await axios.get('/api/check-cookie'); // Adjust the path as needed
        if (response.data.success) {
          console.log('Cookie is valid');
        } else {
          console.log('Cookie is invalid');
        }
      } catch (error) {
        console.error('Error checking cookie:', error);
      }
    };

    checkCookie();
  }, []);*/

  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  function AppLayout() {
    return (
      <div>
        <Outlet />
      </div>
    );
  }

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Adjust the URL to match your API endpoint for the auth check
        const response = await axios.get('http://localhost:5050/auth/check/doctor', { withCredentials: true });
        if (response.data.loggedIn) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        console.error('Error checking auth status', error);
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  if (isAuth) {
    console.log('Authenticated !!!!!!!!!!!!!!!!!!!!!!!!!');
  } else {
    console.log('Not Authenticated !!!!!!!!!!!!!!!!!!!!!!!!!');
  }

  if (isAuth) {
    return (
      <div className={`${styles['w-full']} ${styles['p-6']}`}>
        <GetDoctorPatients />
        <div className="flex justify-center mt-20 space-x-4 ">
          <Link to="/create-patient"><button className={styles['login-button']}>Create Patient</button></Link>
          <Link to="/auth/logout"><button className={styles['logout-button']}>Logout</button></Link>
        </div>
      </div>
    );
  } else {
    return <LoginOrRegister />;
  }
};

export default ProtectedRoute;
