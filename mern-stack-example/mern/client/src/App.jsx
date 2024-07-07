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

function App() {
  return (
    <div className="w-full p-6">

      <Navbar />
      <RecordList />
      

      <Link to="/auth/login" className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150 ease-in-out">Login</Link>
      <Link to="/auth/register" className="inline-block ml-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-150 ease-in-out">Register</Link>

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