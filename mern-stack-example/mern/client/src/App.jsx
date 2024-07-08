/*import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="w-full p-6">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default App;*/


import React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecordList from './components/RecordList';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Record from './components/Record';
import './App.css'; 


function AppLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}




function App() {
  return (
    <div className="w-full p-6">


      <ProtectedRoute />
    
     
      
      

    </div>

    /*
    <div className="w-full p-6">
      <Navbar />


      
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/" element={<RecordList />} />
      </Routes>
    </div>*/
  );
}

export default App;