import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './CreatePrescription.module.css'; // Import the specific CSS module for component-specific styles
import genericStyles from '../Tests/Components.module.css'; // Import the generic styles

const CreatePrescription = () => {
  const [formData, setFormData] = useState({
    medications: [{ name: '', dosage: '', quantity: 1, administration: '', concentration: ''}],
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
    setFormData({ ...formData, medications: [...medications, { name: '', dosage: '', quantity: 1, administration: '', concentration: '' }] });
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
    <div className={genericStyles.container}>
    <form onSubmit={onSubmit} className={genericStyles.form}>
      {medications.map((medication, index) => (
        <div key={index} className={`${genericStyles.card} ${genericStyles.formGroup}`}>
          <input 
            type="text" 
            name="name" 
            value={medication.name} 
            onChange={(e) => onChange(e, index)} 
            placeholder="Medication Name" 
            required 
            className={genericStyles.input}
          />
          <input 
            type="text" 
            name="dosage" 
            value={medication.dosage} 
            onChange={(e) => onChange(e, index)} 
            placeholder="Dosage" 
            required 
            className={genericStyles.input}
          />
          <input 
            type="number" 
            name="quantity" 
            value={medication.quantity} 
            onChange={(e) => onChange(e, index)} 
            placeholder="Quantity" 
            required 
            min="1" 
            className={genericStyles.input}
          />
          <input
            type="text"
            name="administration"
            value={medication.administration}
            onChange={(e) => onChange(e, index)}
            placeholder="Administration"
            className={genericStyles.input}
          />
          <input
            type="text"
            name="concentration"
            value={medication.concentration}
            onChange={(e) => onChange(e, index)}
            placeholder="Concentration"
            className={genericStyles.input}
          />
          <button  onClick={() => removeMedication(index)} className={genericStyles.button}>
            Remove
          </button>
        </div>
      ))}
      <button onClick={addMedication} className={`${genericStyles.button} ${styles.addMedicationButton}`}>Add Medication</button>
      <textarea 
        name="notes" 
        value={notes} 
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })} 
        placeholder="Notes" 
        className={genericStyles.textarea}
      />
      <button className={genericStyles.button}>Create Prescription</button>
    </form>
    </div>
  );
}

export default CreatePrescription;
