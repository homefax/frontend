import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Header: React.FC = () => {
  const location = useLocation();
  
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
            <Logo />
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
          
          {isLoggedIn ? (
            <Link to="/dashboard" className="auth-button">My Account</Link>
          ) : (
            <Link to="/auth" className="auth-button">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;