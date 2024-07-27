import React, { useState } from 'react';
import axios from 'axios';
import styles from './Forms.module.css';

const DoctorRegistration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [codparafa, setCodparafa] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [clinicAddress, setClinicAddress] = useState('');
  const [clinicPhone, setClinicPhone] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/auth/register/doctor', {
        username,
        email,
        password,
        firstname,
        lastname,
        codparafa,
        clinicName,
        clinicAddress,
        clinicPhone,
        phone
      }, { withCredentials: true });
      alert("Registration successful!");
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Inregistreaza un doctor</h2>
      <input
        type="text"
        placeholder="Numele Utilizatorului"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Prenume"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nume de Familie"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Cod Parafa"
        value={codparafa}
        onChange={(e) => setCodparafa(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Numele Clinicii"
        value={clinicName}
        onChange={(e) => setClinicName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Adresa Clinicii"
        value={clinicAddress}
        onChange={(e) => setClinicAddress(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Telefonul Clinicii"
        value={clinicPhone}
        onChange={(e) => setClinicPhone(e.target.value)}
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

export default DoctorRegistration;
