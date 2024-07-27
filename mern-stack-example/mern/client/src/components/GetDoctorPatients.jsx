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
      <h2 className={genericStyles.header}>Pacienti</h2>
      {patients.length > 0 && (
        <div>
          <table className={genericStyles.table}>
            <thead>
              <tr>
                <th>Prenume</th>
                <th>Nume de Familie</th>
                <th>Detalii</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(patient => (
                <tr key={patient._id}>
                  <td>{patient.firstName}</td>
                  <td>{patient.lastName}</td>
                  <td>
                    <Link to={`/patients/${patient._id}`} className={styles['details-link']}>Vizioneaza detalii</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {patients.length === 0 && (
        <p>Nici-un pacient gasit. Va rugam reincarcati pagina.</p>
      )}

      <div className={genericStyles.marginBottom}>
        <Link to="/create-patient"><button className={genericStyles.button}>Creeaza un pacient</button></Link>
      </div>
    </div>
  );
};

export default GetDoctorPatients;
