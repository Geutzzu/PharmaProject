import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios if not already done
import LoginOrRegister from './LoginOrRegister';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import RecordList from './RecordList';
import Record from './Record';


const ProtectedRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

    
function AppLayout() {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  }
  


  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Adjust the URL to match your API endpoint for the auth check
        const response = await axios.get('http://localhost:5050/auth/check', { withCredentials: true });
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
  if(isAuth) {
    console.log('Authenticated !!!!!!!!!!!!!!!!!!!!!!!!!');
  }
  else 
    {
        console.log('Not Authenticated !!!!!!!!!!!!!!!!!!!!!!!!!');
    }
  if(isAuth) {
    return (
     <Routes>
        <Route path="/" element={<AppLayout />}> {/* AppLayout should contain <Outlet /> where child components will render */}
        {/* Define child routes here */}
        <Route index element={<RecordList />} /> {/* Renders at the path "/" */}
        <Route path="record-list" element={<RecordList />} /> {/* Renders at the path "/record-list" */}
        <Route path="create" element={<Record />} /> {/* Renders at the path "/create" */}
        <Route path="edit/:id" element={<Record />} /> {/* Renders at the path "/edit/:id" */}
        </Route>
     </Routes>
    );
    }
    else {
        return <LoginOrRegister />;
    }

};

export default ProtectedRoute;