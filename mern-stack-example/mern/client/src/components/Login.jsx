import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Login = () => {



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try { /// !!!!
      const res = await axios.post('http://localhost:5050/auth/login', { email, password }, { withCredentials: true });
      // Redirect or update authentication state
      navigate('/');
      alert("Login successful!");
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  /*
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5050/auth/logout', { withCredentials: true });
      alert("Logged out successfully!");
      // redirect or update the state to reflect that the user is logged out
      Navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };
  */

  return (
    <form onSubmit={handleSubmit} className="form">
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

      {/*<button onClick={handleLogout}>Logout</button>*/}

    </form>
  );
};

export default Login;
