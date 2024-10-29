import React, { useState } from 'react';
import axios from 'axios';
import styles from './FindPrescription.module.css';
import genericStyles from '../Tests/Components.module.css';

const PrescriptionSearch = () => {
  const [prescriptionID, setPrescriptionID] = useState('');
  const [prescription, setPrescription] = useState(null);
  const [claim, setClaim] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pharmacy/prescription/${prescriptionID}`, { withCredentials: true });
      if (response.data.length > 0) {
        setPrescription(response.data[0]);
        if (response.data[0].pharmacyId) {
          setClaim(true);
        }
        setError('');
      } else {
        setPrescription(null);
        setError('Prescription not found. Please enter a valid ID.');
      }
    } catch (err) {
      setPrescription(null);
      setError('Prescription not found. Please enter a valid ID.');
    }
  };

  const handleClaim = async () => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/pharmacy/prescription/${prescription._id}`, [], { withCredentials: true });
      if (response) {
        setClaim(true);
      } else {
        setClaim(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    setPrescriptionID(e.target.value);
  };

  return (
    <div className={`${styles.container} ${genericStyles.card}`}>
      <h1 className={`${genericStyles.header} text-center`}>Cauta o reteta</h1>
      <input
        type="text"
        value={prescriptionID}
        onChange={handleInputChange}
        placeholder="Introduceti ID-ul retetei"
        className={`${genericStyles.input} ${styles.input}`}
      />
      <button onClick={handleSearch} className={`${genericStyles.button} ${styles.button}`}>Cauta</button>
      {error && <p className={genericStyles.error}>{error}</p>}
      {prescription && (
        <div className={`${genericStyles.details} ${styles.details} ${genericStyles.card}`}>
          <h2 className={genericStyles.subheader}>Detalii reteta</h2>
          <p><strong>ID Reteta:</strong> {prescription.prescriptionID}</p>
          <p><strong>Medicamente:</strong></p>
          {prescription.medications && prescription.medications.length > 0 ? (
            <table className={genericStyles.table}>
              <thead>
                <tr>
                  <th>Nume</th>
                  <th>Dozaj</th>
                  <th>Cantitate</th>
                  <th>Administrare</th>
                  <th>Concentratie</th>
                </tr>
              </thead>
              <tbody>
                {prescription.medications.map((medication, index) => (
                  <tr key={index}>
                    <td>{medication.name}</td>
                    <td>{medication.dosage}</td>
                    <td>{medication.quantity}</td>
                    <td>{medication.administration || 'N/A'}</td>
                    <td>{medication.concentration || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nici-un medicament gasit pentru reteta</p>
          )}
          <p><strong>Revendicata:</strong> {claim ? 'Da' : 'Nu'}</p>
          {prescription.notes && <p><strong>Observatii:</strong> {prescription.notes}</p>}
          <button onClick={handleClaim} className={`${genericStyles.button} ${styles.button}`}>Revendica Reteta</button>
        </div>
      )}
    </div>
  );
};

export default PrescriptionSearch;
