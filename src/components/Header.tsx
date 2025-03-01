import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { ThemeContext } from '../context/ThemeContext';
import HomeFaxLogo from './HomeFaxLogo';

const Header: React.FC = () => {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Check if user is logged in (for demo purposes, we'll assume they are if they're on certain pages)
  const isLoggedIn = location.pathname === '/dashboard' ||
                     location.pathname === '/reports' ||
                     location.pathname === '/activity' ||
                     location.pathname === '/governance' ||
                     location.pathname.startsWith('/properties/');
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <Link to="/">
            <HomeFaxLogo />
          </Link>
        </div>
        
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        
        <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
              <Link to="/properties" className="nav-link">Properties</Link>
            </li>
            <li>
              <Link to="/governance" className="nav-link">DAO Governance</Link>
            </li>
          </ul>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isLoggedIn ? (
              <Link to="/dashboard" className="auth-button">My Account</Link>
            ) : (
              <Link to="/auth" className="auth-button">Sign In</Link>
            )}
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;