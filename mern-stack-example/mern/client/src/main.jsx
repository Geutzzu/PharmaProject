import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import Login from "./components/Login";
import RegisterDoctor from "./components/RegisterDoctor";
import RegisterPharmacy from "./components/RegisterPharmacy";
import GetDoctorPatients from "./components/GetDoctorPatients";
import CreatePatient from "./components/CreatePatient";
import CreatePrescription from "./components/CreatePrescription";
import PatientDetails from "./components/PatientDetails";
import Logout from "./components/Logout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/get-doctor-patients",
        element: <GetDoctorPatients />,
  },
  {
    path: "/patients/:patientId",
    element: <PatientDetails />,
  },
  {
    path: "/create-prescription",
    element: <CreatePrescription />,
  },
  {
    path: "/create-patient",
    element: <CreatePatient />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register/doctor",
    element: <RegisterDoctor />,
  },
  {
    path: "/auth/register/pharmacy",
    element: <RegisterPharmacy />,
  },

  {
    path: "/auth/logout",
    element: <Logout />,
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);