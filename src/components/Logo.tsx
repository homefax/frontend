import React, { useContext } from 'react';
import './Logo.css';
import { ThemeContext } from '../context/ThemeContext';

interface LogoProps {
  width?: number;
  height?: number;
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ width = 240, height = 80, showTagline = true }) => {
  const { theme } = useContext(ThemeContext) || { theme: 'light' };
  const isDarkMode = theme === 'dark';
  
  // Enhanced colors for better visibility in both themes
  const gradientColors = isDarkMode
    ? { start: "#4FACFE", end: "#00E676" }
    : { start: "#2A5082", end: "#4FACFE" };
    
  const textColor = isDarkMode ? "#4FACFE" : "#2A5082";
  const taglineColor = isDarkMode ? "rgba(255, 255, 255, 0.8)" : "rgba(42, 80, 130, 0.7)";
  const circuitColor = isDarkMode ? "#00E676" : "#4FACFE";
  
  // Use darker colors for nodes and inner path in light mode for better visibility
  const nodeColor = isDarkMode ? "#FFFFFF" : "#2A5082";
  const innerPathColor = isDarkMode ? "#FFFFFF" : "#2A5082";
  
  // Add shadow for better visibility in light mode
  const lightModeShadow = !isDarkMode ? "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))" : "none";
  
  return (
    <div className="logo-container" style={{ width, height }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 240 80"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: lightModeShadow }}
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientColors.start} />
            <stop offset="100%" stopColor={gradientColors.end} />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Single Blockchain Hexagon */}
        <g className="logo-icon">
          {/* Background for light mode visibility */}
          {!isDarkMode && (
            <polygon
              points="30,10 50,20 50,40 30,50 10,40 10,20"
              fill="#E1E4E8"
              opacity="0.3"
              transform="translate(1, 1)"
            />
          )}
          
          <polygon
            points="30,10 50,20 50,40 30,50 10,40 10,20"
            fill="url(#logoGradient)"
            className="hexagon-shape"
            stroke={!isDarkMode ? "#2A5082" : "none"}
            strokeWidth={!isDarkMode ? "0.5" : "0"}
          />
          
          {/* Inner details */}
          <path
            d="M30,15 L42,22 L42,35 L30,42 L18,35 L18,22 Z"
            fill="none"
            stroke={innerPathColor}
            strokeWidth={isDarkMode ? "1" : "1.5"}
            opacity={isDarkMode ? "0.7" : "0.9"}
          />
          
          {/* Connection nodes */}
          <circle cx="30" cy="10" r="2" fill={nodeColor} className="node" />
          <circle cx="50" cy="20" r="2" fill={nodeColor} className="node" />
          <circle cx="50" cy="40" r="2" fill={nodeColor} className="node" />
          <circle cx="30" cy="50" r="2" fill={nodeColor} className="node" />
          <circle cx="10" cy="40" r="2" fill={nodeColor} className="node" />
          <circle cx="10" cy="20" r="2" fill={nodeColor} className="node" />
          
          {/* Digital circuit line */}
          <line x1="50" y1="30" x2="65" y2="30" stroke={circuitColor} strokeWidth="1.5" className="circuit-line" />
        </g>
        
        {/* Main Text */}
        <text
          x="75"
          y="30"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fontSize="24"
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
            fontSize="8"
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

export default Logo;