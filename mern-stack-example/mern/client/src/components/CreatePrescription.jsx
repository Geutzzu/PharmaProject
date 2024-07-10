import React, { useState } from 'react';
import axios from 'axios';

const CreatePrescription = () => {
  const [formData, setFormData] = useState({
    medications: [{ name: '', dosage: '', quantity: 1 }],
    patientId: '',
    notes: ''
  });

  const { medications, patientId, notes } = formData;

  const onChange = (e, index) => {
    const updatedMedications = medications.map((medication, i) => 
      index === i ? { ...medication, [e.target.name]: e.target.value } : medication
    );
    setFormData({ ...formData, medications: updatedMedications });
  };

  const addMedication = () => {
    setFormData({ ...formData, medications: [...medications, { name: '', dosage: '', quantity: 1 }] });
  };

  const removeMedication = (index) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    setFormData({ ...formData, medications: updatedMedications });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/prescriptions', formData); // Adjust the URL based on your backend setup
      console.log(res.data);
      alert('Prescription created successfully!');
    } catch (err) {
      console.error(err.response.data);
      alert('Error creating prescription!');
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {medications.map((medication, index) => (
        <div key={index}>
          <input type="text" name="name" value={medication.name} onChange={(e) => onChange(e, index)} placeholder="Medication Name" required />
          <input type="text" name="dosage" value={medication.dosage} onChange={(e) => onChange(e, index)} placeholder="Dosage" required />
          <input type="number" name="quantity" value={medication.quantity} onChange={(e) => onChange(e, index)} placeholder="Quantity" required min="1" />
          <button type="button" onClick={() => removeMedication(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addMedication}>Add Medication</button>
      <input type="text" name="patientId" value={patientId} onChange={(e) => setFormData({ ...formData, patientId: e.target.value })} placeholder="Patient ID" required />
      <textarea name="notes" value={notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Notes" />
      <button type="submit">Create Prescription</button>
    </form>
  );
}

export default CreatePrescription;
