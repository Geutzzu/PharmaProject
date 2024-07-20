import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import styles from './PatientDetails.module.css';

const PatientDetails = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patientRes = await axios.get(`http://localhost:5050/api/patients/${patientId}`, { withCredentials: true });
        setPatient(patientRes.data);

        const prescriptionsRes = await axios.get(`http://localhost:5050/api/patients/${patientId}/prescriptions`, { withCredentials: true });
        setPrescriptions(prescriptionsRes.data);

        const initialDate = patientRes.data.createdAt;
        const formattedDate = initialDate.split('T')[0];
        setDate(formattedDate);

      } catch (err) {
        console.error(err);
        alert('Error retrieving patient details or prescriptions!');
      }
    };

    fetchPatientData();
  }, [patientId]);

  if (!patient) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h2>Patient Details</h2>
      <div className={styles.patientDetails}>
        <p><strong>First Name:</strong> {patient.firstName}</p>
        <p><strong>Last Name:</strong> {patient.lastName}</p>
        <p><strong>CNP:</strong> {patient.CNP}</p>
        <p><strong>Phone:</strong> {patient.phone}</p>
        <p><strong>Email:</strong> {patient.email}</p>
      </div>

      <h3>Prescriptions</h3>
      <Link to={`/create-prescription/${patientId}`} className={styles.createPrescriptionBtn}>Create Prescription</Link>
      {prescriptions.length > 0 ? (
        <table className={styles.prescriptionTable}>
          <thead>
            <tr>
              <th>No.</th> 
              <th>Date</th>
              <th>Notes</th>
              <th>Medications</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription, index) => (
              <tr key={prescription._id}>
                <td>{index + 1}</td> {/* Display index + 1 for each prescription */}
                <td>{date}</td>
                <td>{prescription.notes}</td>
                <td>
                  <ul>
                    {prescription.medications.map((medication, index) => (
                      <li key={index}>
                        <p><strong>Name:</strong> {medication.name}</p>
                        <p><strong>Dosage:</strong> {medication.dosage}</p>
                        <p><strong>Quantity:</strong> {medication.quantity}</p>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))} 
          </tbody>
        </table>
      ) : (
        <p>No prescriptions found for this patient.</p>
      )}
    </div>
  );
};

export default PatientDetails;
