import React from 'react';
import '../index.css';
import logo from './image/Final_Fayda.png';  // relative import from components/image

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="Fayda Logo" className="fayda-logo" />
        <span>Fayda Justice</span>
      </div>
      <div>
        {/* Add user profile / logout / language here */}
      </div>
    </div>
  );
};

export default Header;
