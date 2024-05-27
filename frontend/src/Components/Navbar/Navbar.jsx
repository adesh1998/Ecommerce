import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import Dropdown from 'react-bootstrap/Dropdown';

export const Navbar = () => {
    const [menu,setMenu]=useState("shop")
    const {getTotalCarItems}=useContext(ShopContext)

    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const firstName = localStorage.getItem('firstName');
    const navigate = useNavigate();


    const handleLogout = () => {
      // Implement your logout functionality here
      localStorage.setItem('loggedIn', 'false'); // Update the login status on logout
      navigate('/');
    };
  
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className='nav-menu'>
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>} </li>
            <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:'none'}} to='/mens'>Men</Link> {menu==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:'none'}} to='/womens'>Women</Link> {menu==="womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:'none'}} to='/kids'>Kids</Link> {menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className='nav-login-cart'>
        {isLoggedIn ? (
            <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic" className="profile-button">
              <span>Hi {firstName}</span>
              {/* Replace this with your profile icon */}
            
            </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item href="#/action-1">Your Account</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Your Orders</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Your Lists</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
        ) : (
          <Link to='/signup'>
            <button>Signup</button>
          </Link>
        )}
            <Link to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className='nav-cart-count'>{getTotalCarItems()}</div>
        </div>
    </div>
  )
}
