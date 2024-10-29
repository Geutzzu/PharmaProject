import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../LoginOrRegister.module.css'; // Import the combined CSS
import genericStyles from '../../Tests/Components.module.css'; // Import the generic styles


const LoginAdmin = () => {
  const [username, setUsername] = useState('');
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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login/admin`, { username, password }, { withCredentials: true });
      // Redirect or update authentication state
      setIsLoggedIn(true);
      alert("Login successful!");
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className={`${styles.container1} ${styles.loginBackground}`}>
      <div className={`${styles.container} ${genericStyles.card} `}>
        <h1 className={`${styles.whiteText} ${styles.title} text-3xl font-bold text-center`}>Pagina admin</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Nume de utilizator"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Parola"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;