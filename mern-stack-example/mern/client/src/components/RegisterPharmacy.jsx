import React, { useState } from 'react';
import axios from 'axios';
import styles from './Forms.module.css'; // Import the CSS module

const PharmacyRegistration = () => {
  const [pharmacyName, setPharmacyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/auth/register/pharmacy', {
        pharmacyName,
        email,
        password,
        address,
        phone
      }, { withCredentials: true });
      alert("Registration successful!");
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Inregistreaza o farmacie</h2>
      <input
        type="text"
        placeholder="Numele Farmaciei"
        value={pharmacyName}
        onChange={(e) => setPharmacyName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Parola"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Adresa"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Telefon"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit">Inregistreaza-te</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default PharmacyRegistration;
