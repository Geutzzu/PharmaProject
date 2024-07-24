import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import CreatePatient from './components/CreatePatient';
import GetDoctorPatients from './components/GetDoctorPatients';
import CreatePrescription from './components/CreatePrescription';
import PatientDetails from './components/PatientDetails';
import Navbar from './components/Navbar';
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<ProtectedRoute  />} /> {/* Or your default component */}
          <Route exact path="/get-doctor-patients" element={<GetDoctorPatients />} />
          <Route exact path="/patients/:patientId" element={<PatientDetails />} />
          <Route exact path="/create-prescription/:patientId" element={<CreatePrescription />} />
          <Route exact path="/create-patient" element={<CreatePatient />} />
        </Routes>
        <Footer />
    </AuthProvider>
  );
}

export default App;
