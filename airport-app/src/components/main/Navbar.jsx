import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="nav-list">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              <span className="nav-icon"></span>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              <span className="nav-icon"></span>
              Admin Panel
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;