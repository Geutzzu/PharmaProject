import React, { useState } from 'react';
import axios from 'axios';

const GetDoctorPrescriptions = () => {
  const [doctorId, setDoctorId] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/doctor/${doctorId}/prescriptions`); // Adjust the URL based on your backend setup
      setPrescriptions(res.data);
    } catch (err) {
      console.error(err.response.data);
      alert('Error retrieving prescriptions!');
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} placeholder="Doctor ID" required />
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

export default GetDoctorPrescriptions;
