import React, { useState } from 'react';
import axios from 'axios';
import './CreatePatient.css'; // Import the CSS file

const CreatePatient = () => {



  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    CNP: '',
    phone: '',
    email: ''
  });

  const { firstName, lastName, CNP, phone, email } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/api/patients', formData);
      console.log(res.data);
      alert('Patient created successfully!');
    } catch (err) {
      console.error(err.response.data);
      alert('Error creating patient!');
    }
  }

  return (
    <form onSubmit={onSubmit} className="form-container">
      <input type="text" name="firstName" value={firstName} onChange={onChange} placeholder="First Name" required className="input-field" />
      <input type="text" name="lastName" value={lastName} onChange={onChange} placeholder="Last Name" required className="input-field" />
      <input type="text" name="CNP" value={CNP} onChange={onChange} placeholder="CNP" required className="input-field" />
      <input type="text" name="phone" value={phone} onChange={onChange} placeholder="Phone" required className="input-field" />
      <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required className="input-field" />
      <button type="submit" className="submit-button">Create Patient</button>
    </form>
  );
}

export default CreatePatient;