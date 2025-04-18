import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top">
          <p>&copy; {new Date().getFullYear()} Airport Flight Management System</p>
          <p>Final Sprint Project - Spring Boot & React Application</p>
        </div>
        <div className="footer-bottom">
          <p>Real-time flight tracking and airport management</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;