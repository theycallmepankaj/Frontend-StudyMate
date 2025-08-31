import React from 'react';
import { BiLogoBitcoin } from 'react-icons/bi';
import { Link } from 'react-router-dom';
// import logoIcon from '../assets/logo-icon.png'; // Replace with your actual path

const Header = () => {
  return (
    <header className="py-3 bg-white shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div className="d-flex align-items-center">
          {/* <img
            src={BiLogoBitcoin}
            alt="StudyMate Logo"
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#A020F0',
              borderRadius: '12px',
              padding: '8px',
              marginRight: '10px',
            }}
          /> */}
          <h4 className="mb-0 font-weight-bold">StudyMate</h4>
        </div>

        {/* Nav Links */}
        <nav>
          <ul className="nav">
            <li className="nav-item mx-2 mr-8">
             <Link className="nav-link text-dark font-weight-medium" to="/feature">Features</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link text-dark font-weight-medium" to="/about">About</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link text-dark font-weight-medium" to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* Get Started Button */}
        <Link className="btn btn-teal text-white px-4 py-1 rounded-pill font-weight-bold" style={{ backgroundColor: '#0ABAB5' }} to="/signup">
          Get Started
        </Link>
      </div>
    </header>
  );
};

export default Header;