import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './CreatePrescription.module.css'; // Import the CSS Module

const CreatePrescription = () => {
  const [formData, setFormData] = useState({
    medications: [{ name: '', dosage: '', quantity: 1 }],
    patientId: '',
    notes: ''
  });

  const { medications, notes } = formData;
  const { patientId } = useParams(); // We get this from the path

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
      const res = await axios.post(`http://localhost:5050/api/prescriptions/${patientId}`, formData, { withCredentials: true }); 
      console.log(res.data);
      alert('Prescription created successfully!');
    } catch (err) {
      console.error(err.response.data);
      alert('Error creating prescription!');
    }
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {medications.map((medication, index) => (
        <div key={index} className={styles.medication}>
          <input 
            type="text" 
            name="name" 
            value={medication.name} 
            onChange={(e) => onChange(e, index)} 
            placeholder="Medication Name" 
            required 
          />
          <input 
            type="text" 
            name="dosage" 
            value={medication.dosage} 
            onChange={(e) => onChange(e, index)} 
            placeholder="Dosage" 
            required 
          />
          <input 
            type="number" 
            name="quantity" 
            value={medication.quantity} 
            onChange={(e) => onChange(e, index)} 
            placeholder="Quantity" 
            required 
            min="1" 
          />
          <button type="button" onClick={() => removeMedication(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addMedication} className={styles.addMedicationButton}>Add Medication</button>
      <textarea 
        name="notes" 
        value={notes} 
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })} 
        placeholder="Notes" 
      />
      <button type="submit" className={styles.submitButton}>Create Prescription</button>
    </form>
  );
}

export default CreatePrescription;
