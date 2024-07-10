import React, { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit} className="form">
      <h2>Register Pharmacy</h2>
      <input
        type="text"
        placeholder="Pharmacy Name"
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
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default PharmacyRegistration;
