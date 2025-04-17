import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Admin Panel
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;