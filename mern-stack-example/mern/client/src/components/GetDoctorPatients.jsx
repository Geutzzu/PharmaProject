import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './GetDoctorPatients.css'; 

const GetDoctorPatients = () => {

  const [patients, setPatients] = useState([]); /// all patients of the logged-in doctor

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.get('http://localhost:5050/doctor/patients'); // Retrieve all patients of the logged-in doctor
      setPatients(res.data);
    } catch (err) {
      console.error(err.response.data);
      alert('Error retrieving patients!');
    }
  };

  return (
    <div className="container">
      <h2>Your Patients</h2>
      {patients.length > 0 && (
        <table className="patients-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient._id}>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>
                  <Link to={`/patients/${patient._id}`} className="details-link">View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {patients.length === 0 && (
        <p>No patients found. Please click "Get Patients" to retrieve the list.</p>
      )}
    </div>
  );
};

export default GetDoctorPatients;
