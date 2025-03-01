import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './Logo.css';

interface HomeFaxLogoProps {
  width?: number;
  height?: number;
  showTagline?: boolean;
  style?: React.CSSProperties;
}

const HomeFaxLogo: React.FC<HomeFaxLogoProps> = ({
  width = 240,
  height = 80,
  showTagline = true,
  style
}) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  const combinedStyle = { width, height, ...style };
  
  // Use the appropriate logo based on the theme
  const logoSrc = isDarkMode
    ? '/logo_dark.png'
    : '/logo_light.png';
  
  // Text colors based on theme
  const taglineColor = isDarkMode ? "rgba(255, 255, 255, 0.8)" : "rgba(42, 80, 130, 0.7)";
  
  return (
    <div className="logo-container" style={combinedStyle}>
      <div style={{ position: 'relative' }}>
        {/* Logo Image */}
        <img
          src={logoSrc}
          alt="HomeFax Logo"
          style={{ width: '30%', height: '30%', objectFit: 'contain' }}
        />
        
        {/* Text Overlay */}
        <svg
          width={width}
          height={height}
          viewBox="0 0 240 80"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {/* Define the gradient */}
          <defs>
            <linearGradient id="logoTextGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E676" /> {/* Green (blockchain-accent) */}
              <stop offset="100%" stopColor="#00A8FF" /> {/* Blue (blockchain-secondary) */}
            </linearGradient>
          </defs>
          
          {/* Main Text with Gradient */}
          <text
            x="75"
            y="30"
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
            fontSize="24"
            fill="url(#logoTextGradient)"
            className="logo-text"
          >
            HomeFax
          </text>
          
          {/* Tagline */}
          {showTagline && (
            <text
              x="75"
              y="50"
              fontFamily="Arial, sans-serif"
              fontWeight="normal"
              fontSize="8"
              fill={taglineColor}
              className="logo-tagline"
            >
              Because Every House Has a Past
            </text>
          )}
        </svg>
      </div>
    </div>
  );
};

export default HomeFaxLogo;