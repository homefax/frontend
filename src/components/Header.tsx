import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { ThemeContext } from '../context/ThemeContext';
import HomeFaxLogo from './HomeFaxLogo';

const Header: React.FC = () => {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  
  // Check if user is logged in (for demo purposes, we'll assume they are if they're on certain pages)
  const isLoggedIn = location.pathname === '/dashboard' ||
                     location.pathname === '/reports' ||
                     location.pathname === '/activity' ||
                     location.pathname.startsWith('/properties/');
  
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <Link to="/">
            <HomeFaxLogo />
          </Link>
        </div>
        
        <nav className="main-nav">
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
              <Link to="/properties" className="nav-link">Properties</Link>
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