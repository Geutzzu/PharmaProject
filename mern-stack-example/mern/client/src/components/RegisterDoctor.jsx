import React, { useState } from 'react';
import axios from 'axios';
import styles from './Forms.module.css';

const UnclaimedDoctorRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    role: 'doctor', // Set role directly
    email: '',
    phone: '',
    password: '',
    firstname: '',
    lastname: '',
    codparafa: '',
    clinicName: '',
    clinicAddress: '',
    clinicPhone: '',
    identityProof: null
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, identityProof: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/admin/unclaimed-doctors`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      alert('Registration request successful!');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Cerere pentru cont de doctor</h2>
      <input
        type="text"
        name="username"
        placeholder="Nume de utilizator"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Telefon"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Parola"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="firstname"
        placeholder="Prenume"
        value={formData.firstname}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastname"
        placeholder="Nume"
        value={formData.lastname}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="codparafa"
        placeholder="Cod Parafa"
        value={formData.codparafa}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="clinicName"
        placeholder="Numele Clinicii"
        value={formData.clinicName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="clinicAddress"
        placeholder="Adresa Clinicii"
        value={formData.clinicAddress}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="clinicPhone"
        placeholder="Telefon Clinicii"
        value={formData.clinicPhone}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="identityProof"
        onChange={handleFileChange}
        required
      />
      <button type="submit">Trimite cererea</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default UnclaimedDoctorRegistration;