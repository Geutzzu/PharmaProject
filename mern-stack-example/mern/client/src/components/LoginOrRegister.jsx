import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginOrRegister.module.css'; // Import the combined CSS


const LoginOrRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
        // Add the class to the body when the component mounts
        document.body.classList.add('login-background');

        // Remove the class from the body when the component unmounts
        return () => {
            document.body.classList.remove('login-background');
        };
    }, []);

    useEffect(() => {
            /// if logged in, redirect to the dashboard
         if (isLoggedIn) {
            window.location.reload();
         }
    }, [isLoggedIn, navigate]);   

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/auth/login', { email, password }, { withCredentials: true });
      // Redirect or update authentication state
      setIsLoggedIn(true);
      alert("Login successful!");
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className={`${styles.container1} ${styles.loginBackground}`}>
      <div className={styles.container}>
        <h1 className={`${styles.whiteText} ${styles.title} text-3xl font-bold text-center`}>Welcome to Pharma Chestie</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Login</h2>
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
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </form>
        <div className={styles.buttonContainer}>
          <Link to="/auth/register/doctor" className="inline-block ml-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-150 ease-in-out">Register as a doctor</Link>
          <Link to="/auth/register/pharmacy" className="inline-block ml-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-150 ease-in-out">Register as a pharmacy</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginOrRegister;