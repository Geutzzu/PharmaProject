import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './GetDoctorPatients.module.css';
import genericStyles from '../../Tests/Components.module.css';
import Pagination from '../Pagination.jsx';
import { useAuth } from '../AuthContext.jsx';

const GetDoctorPatients = () => {
  const [patients, setPatients] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage, setPatientsPerPage] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);


  const fetchPatients = async (page = 1) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/doctor/patients?page=${page}`, { withCredentials: true });
      setPatients(res.data.patients);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.page);
      setPatientsPerPage(res.data.patients.length);
      setTotalPatients(res.data.totalPatients);

    } catch (err) {
      console.error(err.response.data);
      alert('Error retrieving patients!');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handlePageChange = (page) => {
    fetchPatients(page);
  };


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
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} totalItems={totalPatients} itemsPerPage={patientsPerPage}  />
        </div>
      )}
      {patients.length === 0 && (
        <p className="mt-4">Nici-un pacient gasit. Va rugam reincarcati pagina.</p>
      )}

    </div>
  );
};

export default GetDoctorPatients;