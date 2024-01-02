import React from 'react'
import './CSS/LoginSignup.css'
import { Loginpage } from './Loginpage'
import { Link } from 'react-router-dom'
export const LoginSignup = () => {
  return (
    <div className='loginsignup'>
        <div className="loginsignup-container">
            <h1>Sign Up</h1>
            <div className="loginsignup-fields">
                <input type="text" placeholder='Your Name' />
                <input type="email" placeholder='Email Address' />
                <input type="password" placeholder='Passowrd' />
            </div>
            <button>Signup</button>
            <p className="loginsignup-login">Already have an accont? <span><Link to='/login'>Login Here</Link></span></p>
            <div className="loginsignup-agree">
                <input type="checkbox" name='' id='' />
                <p>By Continuing, i agree to term of use & privacy policy</p>
            </div>
        </div>
        </div>
  )
}
