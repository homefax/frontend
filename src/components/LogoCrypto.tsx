import React, { useContext } from 'react';
import './Logo.css';
import { ThemeContext } from '../context/ThemeContext';

interface LogoProps {
  width?: number;
  height?: number;
  showTagline?: boolean;
  style?: React.CSSProperties;
}

const LogoCrypto: React.FC<LogoProps> = ({ width = 240, height = 80, showTagline = true, style }) => {
  const combinedStyle = { width, height, ...style };
  const { theme } = useContext(ThemeContext) || { theme: 'light' };
  const isDarkMode = theme === 'dark';
  
  // Enhanced colors for better visibility in both themes
  const gradientColors = isDarkMode
    ? { primary: "#4FACFE", secondary: "#00E676", accent: "#FF9D66" }
    : { primary: "#2A5082", secondary: "#4FACFE", accent: "#FF7E3F" };
    
  const textColor = isDarkMode ? "#4FACFE" : "#2A5082";
  const taglineColor = isDarkMode ? "rgba(255, 255, 255, 0.8)" : "rgba(42, 80, 130, 0.7)";
  
  // Blockchain colors
  const blockchainColor = isDarkMode ? "#00E676" : "#4FACFE";
  const nodeColor = isDarkMode ? "#FFFFFF" : "#2A5082";
  const letterColor = isDarkMode ? "#FFFFFF" : "#2A5082";
  const hexBorderColor = isDarkMode ? "#4FACFE" : "#2A5082";
  const hexFillColor = isDarkMode ? "rgba(0, 230, 118, 0.1)" : "rgba(79, 172, 254, 0.1)";
  
  // Add shadow for better visibility in light mode
  const lightModeShadow = !isDarkMode ? "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))" : "none";
  
  return (
    <div className="logo-container" style={combinedStyle}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 240 80"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: lightModeShadow }}
      >
        <defs>
          <linearGradient id="cryptoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientColors.primary} />
            <stop offset="100%" stopColor={gradientColors.secondary} />
          </linearGradient>
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientColors.secondary} />
            <stop offset="100%" stopColor={gradientColors.accent} />
          </linearGradient>
          <filter id="cryptoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Blockchain Logo with H and F letters */}
        <g className="logo-icon">
          {/* Main hexagon */}
          <path
            d="M30,10 L50,22 L50,46 L30,58 L10,46 L10,22 Z"
            fill={hexFillColor}
            stroke={hexBorderColor}
            strokeWidth="1.5"
            className="blockchain-overlay"
          />
          
          {/* H Letter */}
          <path
            d="M20,25 L20,45 M20,35 L30,35 M30,25 L30,45"
            fill="none"
            stroke={letterColor}
            strokeWidth="3"
            strokeLinecap="round"
            className="letter-h"
          />
          
          {/* F Letter */}
          <path
            d="M40,25 L40,45 M40,25 L47,25 M40,35 L45,35"
            fill="none"
            stroke={letterColor}
            strokeWidth="3"
            strokeLinecap="round"
            className="letter-f"
          />
          
          {/* Connection nodes */}
          <circle cx="10" cy="22" r="2" fill={nodeColor} className="node" />
          <circle cx="10" cy="46" r="2" fill={nodeColor} className="node" />
          <circle cx="30" cy="58" r="2" fill={nodeColor} className="node" />
          <circle cx="50" cy="46" r="2" fill={nodeColor} className="node" />
          <circle cx="50" cy="22" r="2" fill={nodeColor} className="node" />
          <circle cx="30" cy="10" r="2" fill={nodeColor} className="node" />
          
          {/* Digital circuit lines */}
          <line x1="10" y1="22" x2="10" y2="46" stroke={blockchainColor} strokeWidth="1" className="circuit-line" />
          <line x1="10" y1="46" x2="30" y2="58" stroke={blockchainColor} strokeWidth="1" className="circuit-line" style={{ animationDelay: "0.2s" }} />
          <line x1="30" y1="58" x2="50" y2="46" stroke={blockchainColor} strokeWidth="1" className="circuit-line" style={{ animationDelay: "0.4s" }} />
          <line x1="50" y1="46" x2="50" y2="22" stroke={blockchainColor} strokeWidth="1" className="circuit-line" style={{ animationDelay: "0.6s" }} />
          <line x1="50" y1="22" x2="30" y2="10" stroke={blockchainColor} strokeWidth="1" className="circuit-line" style={{ animationDelay: "0.8s" }} />
          <line x1="30" y1="10" x2="10" y2="22" stroke={blockchainColor} strokeWidth="1" className="circuit-line" style={{ animationDelay: "1s" }} />
          
          {/* Additional blockchain elements */}
          <line x1="50" y1="34" x2="60" y2="34" stroke={blockchainColor} strokeWidth="1.5" className="circuit-line" />
          <circle cx="60" cy="34" r="1.5" fill={nodeColor} className="node" />
        </g>
        
        {/* Main Text */}
        <text
          x="75"
          y="32"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fontSize="26"
          fill={textColor}
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
            fontSize="9"
            fill={taglineColor}
            className="logo-tagline"
          >
            Because Every House Has a Past
          </text>
        )}
      </svg>
    </div>
  );
};

export default LogoCrypto;