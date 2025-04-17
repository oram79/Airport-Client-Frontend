import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Canadian Airports Flight Management System</p>
      <p>Final Sprint Project - Spring Boot & React Application</p>
    </footer>
  );
};

export default Footer;