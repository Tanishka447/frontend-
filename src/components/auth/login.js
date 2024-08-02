import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import {useAuth} from './useAuth';
import './login.css'; 

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9001/login",{
        email,
        password,
    });
      const { data } = response;
      // login(data.token);
      console.log('Login Response:', data);
      // localStorage.setItem('token', data.token);

      setMessage('Login successful!');
      navigate('/home');
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
