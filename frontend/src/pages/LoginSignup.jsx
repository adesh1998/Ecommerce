// In your React component
import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';
export const LoginSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    
      request(
        "POST",
        "auth/register",
        {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }).then(
        (response) => {
            setAuthHeader(response.data.token);
            navigate('/login')
            
        }).catch(
        (error) => {
            setAuthHeader(null);
            alert(error);
        }
    );
      
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Sign Up</h1>
        <div className='loginsignup-fields'>
          <input type='text' placeholder='Your First Name' onChange={(e) => setFirstName(e.target.value)} />
          <input type='text' placeholder='Your Last Name' onChange={(e) => setLastName(e.target.value)} />
          <input type='email' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleSignup}>Signup</button>
        <div className="login"><p className='loginsignup-login'>
          Already have an account? <span><Link to='/login'>Login Here</Link></span>
        </p></div>
         
        <div className='loginsignup-agree'>
          <input type='checkbox' name='' id='' />
          <p>By Continuing, I agree to terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};
