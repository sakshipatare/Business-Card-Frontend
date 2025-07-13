import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><NavLink to="/home" exact="true" activeclassname="active">Network</NavLink></li>
        <li><NavLink to="/home/qr" activeclassname="active">QR</NavLink></li>
        <li><NavLink to="/home/profile" activeclassname="active">Profile</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
