// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import CreatePatient from './components/CreatePatient';
import GetDoctorPatients from './components/patients/GetDoctorPatients.jsx';
import CreatePrescription from './components/CreatePrescription';
import PatientDetails from './components/PatientDetails';
import ProtectedAdmin from './components/admin/ProtectedAdmin';
import Navbar from './components/navbar/Navbar.jsx';
import './App.css';

function AppContent() {
  const { isNavbarVisible } = useAuth();

  return (
    <div className="flex">
      {isNavbarVisible && <Navbar />}
      <main className={`flex-1 ${isNavbarVisible ? 'ml-80' : ''}`}>
        <Routes>
          <Route exact path="/" element={<ProtectedRoute />} />
          <Route exact path="/get-doctor-patients" element={<GetDoctorPatients />} />
          <Route exact path="/patients/:patientId" element={<PatientDetails />} />
          <Route exact path="/create-prescription/:patientId" element={<CreatePrescription />} />
          <Route exact path="/create-patient" element={<CreatePatient />} />
          <Route exact path="/admin" element={<ProtectedAdmin />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
