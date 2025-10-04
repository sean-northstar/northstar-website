import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsDropdownOpen(false)}>
          <img src="/images/white text no background logo.svg" alt="Northstar Politics Home" className="navbar-logo-img" />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="navbar-desktop">
          <Link to="/about" className="navbar-link">
            About us
          </Link>
          <Link to="/support" className="navbar-link">
            Support us
          </Link>
        </div>

        {/* Mobile Dropdown Button */}
        <button className="mobile-menu-button" onClick={toggleDropdown}>
          <span className={`hamburger ${isDropdownOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Mobile Dropdown */}
        <div ref={dropdownRef} className={`navbar-mobile ${isDropdownOpen ? 'open' : ''}`}>
          <div className="dropdown-menu">
            <Link to="/about" className="dropdown-link" onClick={() => setIsDropdownOpen(false)}>
              About us
            </Link>
            <Link to="/support" className="dropdown-link" onClick={() => setIsDropdownOpen(false)}>
              Support us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
