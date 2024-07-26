import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import styles from '../Tests/Components.module.css'; // Using the generic styles

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
      <h2 className={styles.header}>Patient Details</h2>
      <div className={`${styles.flexColumn} ${styles.card}`}>
        <p><strong>First Name:</strong> {patient.firstName}</p>
        <p><strong>Last Name:</strong> {patient.lastName}</p>
        <p><strong>CNP:</strong> {patient.CNP}</p>
        <p><strong>Phone:</strong> {patient.phone}</p>
        <p><strong>Email:</strong> {patient.email}</p>
      </div>

      <h2 className={styles.subheader}>Prescriptions</h2>
      <Link to={`/create-prescription/${patientId}`} className={styles.button}>Create Prescription</Link>
      {prescriptions.length > 0 ? (
        <div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>No.</th>
                <th>Date</th>
                <th>Notes</th>
                <th>Medications</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription, index) => (
                <tr key={prescription._id}>
                  <td>{index + 1}</td>
                  <td>{date}</td>
                  <td>{prescription.notes}</td>
                  <td>
                    <ul className={styles.list}>
                      {prescription.medications.map((medication, index) => (
                        <li key={index} className={`${styles.listItem} ${styles.flexColumn}`}>
                          <p><strong>Name:</strong> {medication.name}</p>
                          <p><strong>Dosage:</strong> {medication.dosage}</p>
                          <p><strong>Quantity:</strong> {medication.quantity}</p>
                          <p><strong>Administration:</strong> {medication.administration}</p>
                          <p><strong>Concentration:</strong> {medication.concentration}</p>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{prescription.prescriptionID}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No prescriptions found for this patient.</p>
      )}
    </div>
  );
};

export default PatientDetails;
