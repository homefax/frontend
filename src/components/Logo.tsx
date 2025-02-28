import React, { useContext } from 'react';
import './Logo.css';
import { ThemeContext } from '../context/ThemeContext';

interface LogoProps {
  width?: number;
  height?: number;
  showTagline?: boolean;
  style?: React.CSSProperties;
}

const Logo: React.FC<LogoProps> = ({ width = 240, height = 80, showTagline = true, style }) => {
  const combinedStyle = { width, height, ...style };
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  
  // Enhanced colors for better visibility in both themes
  const gradientColors = isDarkMode
    ? { primary: "#4FACFE", secondary: "#00E676", accent: "#FF9D66" }
    : { primary: "#2A5082", secondary: "#4FACFE", accent: "#FF7E3F" };
    
  const textColor = isDarkMode ? "#4FACFE" : "#2A5082";
  const taglineColor = isDarkMode ? "rgba(255, 255, 255, 0.8)" : "rgba(42, 80, 130, 0.7)";
  const circuitColor = isDarkMode ? "#00E676" : "#4FACFE";
  
  // Use darker colors for nodes and details in light mode for better visibility
  const nodeColor = isDarkMode ? "#FFFFFF" : "#2A5082";
  const detailColor = isDarkMode ? "#FFFFFF" : "#2A5082";
  
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
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientColors.primary} />
            <stop offset="100%" stopColor={gradientColors.secondary} />
          </linearGradient>
          <linearGradient id="roofGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientColors.secondary} />
            <stop offset="100%" stopColor={gradientColors.accent} />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Modern House with Blockchain Elements */}
        <g className="logo-icon">
          {/* Background for light mode visibility */}
          {!isDarkMode && (
            <path
              d="M10,40 L10,25 L30,10 L50,25 L50,40 L10,40 Z"
              fill="#E1E4E8"
              opacity="0.3"
              transform="translate(1, 1)"
            />
          )}
          
          {/* House base */}
          <path
            d="M12,40 L12,25 L30,12 L48,25 L48,40 Z"
            fill="url(#logoGradient)"
            className="house-base"
            stroke={!isDarkMode ? "#2A5082" : "none"}
            strokeWidth={!isDarkMode ? "0.5" : "0"}
          />
          
          {/* Roof with different gradient */}
          <path
            d="M12,25 L30,12 L48,25"
            fill="none"
            stroke="url(#roofGradient)"
            strokeWidth="2.5"
            className="house-roof"
          />
          
          {/* Door */}
          <rect
            x="26"
            y="30"
            width="8"
            height="10"
            rx="1"
            fill={detailColor}
            opacity="0.8"
          />
          
          {/* Windows */}
          <rect
            x="16"
            y="26"
            width="7"
            height="7"
            rx="1"
            fill={detailColor}
            opacity="0.8"
          />
          <rect
            x="37"
            y="26"
            width="7"
            height="7"
            rx="1"
            fill={detailColor}
            opacity="0.8"
          />
          
          {/* Blockchain hexagon overlay */}
          <path
            d="M30,18 L38,22 L38,30 L30,34 L22,30 L22,22 Z"
            fill="none"
            stroke={detailColor}
            strokeWidth="0.8"
            opacity="0.6"
            className="blockchain-overlay"
          />
          
          {/* Connection nodes */}
          <circle cx="30" cy="12" r="2" fill={nodeColor} className="node" />
          <circle cx="48" cy="25" r="2" fill={nodeColor} className="node" />
          <circle cx="48" cy="40" r="2" fill={nodeColor} className="node" />
          <circle cx="12" cy="40" r="2" fill={nodeColor} className="node" />
          <circle cx="12" cy="25" r="2" fill={nodeColor} className="node" />
          <circle cx="30" cy="34" r="2" fill={nodeColor} className="node" />
          
          {/* Digital circuit lines */}
          <line x1="48" y1="32" x2="60" y2="32" stroke={circuitColor} strokeWidth="1.5" className="circuit-line" />
          <line x1="30" y1="34" x2="30" y2="40" stroke={circuitColor} strokeWidth="1" className="circuit-line" style={{ animationDelay: "0.5s" }} />
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

export default Logo;