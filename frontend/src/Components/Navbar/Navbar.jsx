import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo copy.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import Redux hooks
import { ShopContext } from '../../context/ShopContext';
import Dropdown from 'react-bootstrap/Dropdown';
import { logout } from '../../redux/authSlice'; // Import logout action

export const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCarItems } = useContext(ShopContext);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Fetch data from Redux store
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const firstName = user?.firstName || ''; // Fallback to empty string if user is null

    const handleLogout = () => {
        dispatch(logout()); // Dispatch logout action
        navigate('/'); // Redirect to home after logout
    };

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img id="logoM" src={logo} alt="" />
                <p>StyleNest</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={() => { setMenu("shop") }}>
                    <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>
                    {menu === "shop" ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("mens") }}>
                    <Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>
                    {menu === "mens" ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("womens") }}>
                    <Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link>
                    {menu === "womens" ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("kids") }}>
                    <Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>
                    {menu === "kids" ? <hr /> : null}
                </li>
            </ul>
            <div className='nav-login-cart'>
                {isLoggedIn ? (
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic" className="profile-button">
                            <span>Hi {firstName}</span>
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
                <Link to='/cart'>
                    <img src={cart_icon} alt="Cart" />
                </Link>
                <div className='nav-cart-count'>{getTotalCarItems()}</div>
            </div>
        </div>
    );
};
