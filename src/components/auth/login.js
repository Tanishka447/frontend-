import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'; // Ensure to import your CSS file
// import axios from 'axios';
import { loginUser } from './authAPI';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(
        email,
        password,
      );
      const { data } = response;
      console.log('Login Response:', data);

      setMessage('Login successful!');
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
      </form>
      {message && <p>{message}</p>}
      <span>
        Don't have an account? <Link to="/register">Register</Link>
      </span>
    </div>
  );
};

export default LoginForm;
