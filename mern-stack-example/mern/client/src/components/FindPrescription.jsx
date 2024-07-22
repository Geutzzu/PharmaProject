import React, { useState } from 'react';
import axios from 'axios';
import styles from './FindPrescription.module.css'; // Import the CSS module

const PrescriptionSearch = () => {
  const [prescriptionID, setPrescriptionID] = useState('');
  const [prescription, setPrescription] = useState(null);
  const [claim, setClaim] = useState(false);
  const [error, setError] = useState('');
 

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5050/api/pharmacy/prescription/${prescriptionID}`, { withCredentials: true });
      console.log(response.data);
      if(response.data.length > 0) {
        setPrescription(response.data[0]);
        console.log(response.data[0]._id);
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
        const response = await axios.patch(`http://localhost:5050/api/pharmacy/prescription/${prescription._id}`, { withCredentials: true });
        console.log(response.data);
        if(response) {
            setClaim(true);
        } else {
            setClaim(false);
        }
    } catch(err) {
      console.log(err);
    }
        
};


  const handleInputChange = (e) => {
    setPrescriptionID(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>Prescription Search</h1>
      <input
        type="text"
        value={prescriptionID}
        onChange={handleInputChange}
        placeholder="Enter Prescription ID"
        className={styles.input}
      />
      <button onClick={handleSearch} className={styles.button}>Search</button>
      {error && <p className={styles.error}>{error}</p>}
      {prescription && (
        <div className={styles.details}>
          <h2>Prescription Details</h2>
          <p><strong>PrescriptionID:</strong> {prescription.prescriptionID}</p>
          <p><strong>Medications:</strong></p>
          {prescription.medications && prescription.medications.length > 0 ? (
            <ul>
              {prescription.medications.map((medication, index) => (
                <li key={index}>
                  <p><strong>Name:</strong> {medication.name}</p>
                  <p><strong>Dosage:</strong> {medication.dosage}</p>
                  <p><strong>Quantity:</strong> {medication.quantity}</p>
                  {medication.administration && <p><strong>Administration:</strong> {medication.administration}</p>}
                  {medication.concentration && <p><strong>Concentration:</strong> {medication.concentration}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p>No medications found for this prescription.</p>
          )}
          <p><strong> Claimed:</strong> {String(claim)}</p>
          {prescription.notes && <p><strong>Notes:</strong> {prescription.notes}</p>}
          <button onClick={handleClaim} className={styles.button}>Claim Prescription</button>
        </div>
      )}
    </div>
  );
};

export default PrescriptionSearch;