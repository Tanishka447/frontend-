import React from 'react';
import { NavLink } from 'react-router-dom';

const navbarStyle = {
  fontSize: '2em', // Adjust the size as needed
  textAlign: 'center', // Center the text
  padding: '20px', // Add padding around the navbar
  backgroundColor: 'black', // Optional: add a background color
};

const linkStyle = {
  textDecoration: 'none', 
  color: 'red', 
};

const Navbar = () => {
  return (
    <div>
      <nav style={navbarStyle}>
        <NavLink to="/" style={linkStyle}>
          <li style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
            EXPENSE-TRACKER WEB APP
          </li>
        </NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
