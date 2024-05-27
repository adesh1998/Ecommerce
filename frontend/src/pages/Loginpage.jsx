import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { Link, useNavigate } from 'react-router-dom';

import { request, setAuthHeader } from '../helpers/axios_helper';
export const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    request(
      "POST",
      "auth/login",
      {
          email: email,
          password: password
      }).then(
      (response) => {
          setAuthHeader(response.data.token);
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('firstName', response.data.firstName);
          navigate("/")
      }).catch(
      (error) => {
          setAuthHeader(null);
      }
  );
  };



  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Login</h1>
        <div className='loginsignup-fields'>
          <input type='email' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleLogin}>Login</button>
        <p className='loginsignup-login'>
          Don't have an account? <span><Link to='/signup'>Signup Here</Link></span>
        </p>
        <div className='loginsignup-agree'>
          <input type='checkbox' name='' id='' />
          <p>By Continuing, I agree to terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};
