// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/postReducer';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Logout=() => {
    dispatch(logout());
    navigate('/');
  }
  return (
    <nav>
      <ul className='navbutt'> 
        <li >
          <Link className="navbar" to="/">Home</Link>          
        </li>
        <li>
        <Link className="navbar" to="/Cart">Cart</Link>
        </li>
        <li>
        <Link className="navbar" to="/orders">Orders</Link>
        </li>
        <li className='logout'>
        <button id="logout" onClick={Logout}>logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
