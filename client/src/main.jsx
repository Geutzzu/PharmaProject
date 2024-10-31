import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import RegisterDoctor from "./components/login/RegisterDoctor.jsx";
import RegisterPharmacy from "./components/login/RegisterPharmacy.jsx";
import GetDoctorPatients from "./components/patients/GetDoctorPatients.jsx";
import CreatePatient from "./components/CreatePatient";
import CreatePrescription from "./components/CreatePrescription";
import PatientDetails from "./components/PatientDetails";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
  },
  {
    path: "/auth/register/doctor",
    element: <RegisterDoctor />,
  },
  {
    path: "/auth/register/pharmacy",
    element: <RegisterPharmacy />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
