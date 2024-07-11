import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PatientDetails = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patientRes = await axios.get(`http://localhost:5050/api/patients/${patientId}`, { withCredentials: true });
        setPatient(patientRes.data);

        const prescriptionsRes = await axios.get(`http://localhost:5050/api/patient/${patientId}/prescriptions`, { withCredentials: true });
        setPrescriptions(prescriptionsRes.data);
      } catch (err) {
        console.error(err);
        alert('Error retrieving patient details or prescriptions!');
      }
    };

    fetchPatientData();
  }, [patientId]);

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h2>Patient Details</h2>
      <p><strong>First Name:</strong> {patient.firstName}</p>
      <p><strong>Last Name:</strong> {patient.lastName}</p>
      <p><strong>CNP:</strong> {patient.CNP}</p>
      <p><strong>Phone:</strong> {patient.phone}</p>
      <p><strong>Email:</strong> {patient.email}</p>

      <h3>Prescriptions</h3>
      {prescriptions.length > 0 ? (
        <ul>
          {prescriptions.map(prescription => (
            <li key={prescription._id}>
              <p><strong>Medications:</strong></p>
              <ul>
                {prescription.medications.map((med, index) => (
                  <li key={index}>
                    {med.name} - {med.dosage} - Quantity: {med.quantity}
                  </li>
                ))}
              </ul>
              <p><strong>Notes:</strong> {prescription.notes}</p>
              <p><strong>Prescribed by Doctor ID:</strong> {prescription.doctorId}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No prescriptions found for this patient.</p>
      )}
    </div>
  );
};

export default PatientDetails;
