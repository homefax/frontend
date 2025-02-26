import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

interface HeaderProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated = false, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <Link to="/">
            <Logo width={50} height={50} />
          </Link>
        </div>
        
        <button className="mobile-menu-button" onClick={toggleMenu}>
          <span className="menu-icon">{menuOpen ? '✕' : '☰'}</span>
        </button>
        
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/properties" className="nav-link">Properties</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
                <li><button onClick={onLogout} className="nav-link">Logout</button></li>
              </>
            ) : (
              <li><Link to="/auth" className="nav-link auth-button">Sign In / Sign Up</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;