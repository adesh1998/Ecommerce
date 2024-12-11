// In your React component
import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';

export const LoginSignup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Registration successful! Please log in.');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      console.error(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <form className="loginsignup-fields" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="Your First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Your Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Signup</button>
        </form>
        <div className="login">
          <p className="loginsignup-login">
            Already have an account?{' '}
            <span>
              <Link to="/login">Login Here</Link>
            </span>
          </p>
        </div>

        <div className="loginsignup-agree">
          <input type="checkbox" name="agree" id="agree" required />
          <label htmlFor="agree">
            By continuing, I agree to terms of use & privacy policy
          </label>
        </div>
      </div>
    </div>
  );
};
