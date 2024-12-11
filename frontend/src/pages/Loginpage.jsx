import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import API from '../utils/api';

export const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });

      // Save user data and token in Redux
      dispatch(login({ user: data.user, token: data.token }));

      // Navigate to the homepage or dashboard
      navigate('/');
    } catch (err) {
      console.error(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Login</h1>
        <div className='loginsignup-fields'>
          <input
            type='email'
            placeholder='Email Address'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Login</button>
        <p className='loginsignup-login'>
          Don't have an account? <span><Link to='/signup'>Signup Here</Link></span>
        </p>
      </div>
    </div>
  );
};
