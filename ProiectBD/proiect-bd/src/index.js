import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Drivers from './pages/Drivers.js';
import AddDriverForm from './pages/AddDriverForm.js';
import EditDriverForm from './pages/EditDriverForm.js';
import EditPrincipal from './pages/EditPrincipal.js';
import AddConstructorForm from './pages/AddConstructorForm.js';
import EditTeamForm from './pages/EditTeamForm.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/> /// Constructors 
  },
  {
    path: "/drivers/:constructorId",
    element: <Drivers/>
  },
  {
    path: "/addDriver",
    element: <AddDriverForm/>
  },
  {
    path: "/updateDriver/:driverId",
    element: <EditDriverForm/> 
  },
  {
    path: "/updateTeamPrincipal/:teamId",
    element: <EditPrincipal/>
  },
  {
    path: "/addConstructor",
    element: <AddConstructorForm/>
  },
  {
    path: "/updateTeam/:teamId",
    element: <EditTeamForm/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

