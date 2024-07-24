import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './GetDoctorPatients.module.css'; 
import genericStyles from '../Tests/Components.module.css';

const GetDoctorPatients = () => {
  const [patients, setPatients] = useState([]); // All patients of the logged-in doctor

  const fetchPatients = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/doctor/patients', { withCredentials: true }); // Retrieve all patients of the logged-in doctor
      setPatients(res.data);
    } catch (err) {
      console.error(err.response.data);
      alert('Error retrieving patients!');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className={genericStyles.container}>
      <h2 className={genericStyles.header}>Your Patients</h2>
      {patients.length > 0 && (
        <div className={genericStyles.card}>
          <table className={genericStyles.table}>
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
                    <Link to={`/patients/${patient._id}`} className={styles['details-link']}>View Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {patients.length === 0 && (
        <p>No patients found. Please refresh the page to try again.</p>
      )}

      <div className={genericStyles.marginBottom}>
        <Link to="/create-patient"><button className={genericStyles.button}>Create Patient</button></Link>
      </div>
    </div>
  );
};

export default GetDoctorPatients;
