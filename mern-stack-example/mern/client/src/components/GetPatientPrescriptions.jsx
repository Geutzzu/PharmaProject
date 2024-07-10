import React, { useState } from 'react';
import axios from 'axios';

const GetPatientPrescriptions = () => {
  const [patientId, setPatientId] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5050/patient/${patientId}/prescriptions`); // Adjust the URL based on your backend setup
      setPrescriptions(res.data);
    } catch (err) {
      console.error(err.response.data);
      alert('Error retrieving prescriptions!');
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="Patient ID" required />
        <button type="submit">Get Prescriptions</button>
      </form>
      <ul>
        {prescriptions.map(prescription => (
          <li key={prescription._id}>{JSON.stringify(prescription)}</li>
        ))}
      </ul>
    </div>
  );
}

export default GetPatientPrescriptions;
