import React from 'react'
import { Link } from 'react-router-dom'

export const Loginpage = () => {
  return (
    <div className='loginsignup'>
    <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
            <input type="email" placeholder='Email Address' />
            <input type="password" placeholder='Passowrd' />
        </div>
        <button>Login</button>
        <p className="loginsignup-login">Don't have an accont? <span><Link to='/signup'>Signup Here</Link></span></p>
        <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>By Continuing, i agree to term of use & privacy policy</p>
        </div>
    </div>
    </div>
  )
}
