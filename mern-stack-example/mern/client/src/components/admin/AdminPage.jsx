import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../Tests/Components.module.css';

const AdminPage = () => {
  const [unclaimedDoctors, setUnclaimedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnclaimedDoctors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/unclaimed-doctors`, { withCredentials: true });
        setUnclaimedDoctors(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };

    fetchUnclaimedDoctors();
  }, []);

  const handleClaimDoctor = async (id) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/admin/claim-doctor/${id}`, {}, { withCredentials: true });
      setUnclaimedDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRejectDoctor = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/reject-doctor/${id}`, { withCredentials: true });
      setUnclaimedDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Cereri de inregistrare pentru doctori</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nume de utilizator</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Prenume</th>
            <th>Nume</th>
            <th>Cod Parafa</th>
            <th>Nume Clinica</th>
            <th>Adresa Clinica</th>
            <th>Telefon Clinica</th>
            <th>Buletin</th>
            <th>Actiuni</th>
          </tr>
        </thead>
        <tbody>
          {unclaimedDoctors.map((doctor) => (
            <tr key={doctor._id}>
              <td>{doctor.username}</td>
              <td>{doctor.email}</td>
              <td>{doctor.phone}</td>
              <td>{doctor.firstname}</td>
              <td>{doctor.lastname}</td>
              <td>{doctor.codparafa}</td>
              <td>{doctor.clinicName}</td>
              <td>{doctor.clinicAddress}</td>
              <td>{doctor.clinicPhone}</td>
              <td>
                <a href={`${import.meta.env.VITE_API_URL}/${doctor.identityProof}`} target="_blank" rel="noopener noreferrer">
                  Vezi poza
                </a>
              </td>
              <td>
                <button className={styles.button} onClick={() => handleClaimDoctor(doctor._id)}>Valideaza</button>
                <button className={`${styles.button} ${styles.rejectButton}`} onClick={() => handleRejectDoctor(doctor._id)}>Respinge</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
