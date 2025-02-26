import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 120, height = 30 }) => {
  return (
    <div className="logo-container" style={{ width, height }}>
      <div className="logo-text" style={{ 
        fontFamily: 'Arial, sans-serif', 
        fontWeight: 'bold', 
        fontSize: '18px',
        color: '#2A5082',
        textAlign: 'left',
      }}>
        HomeFax
      </div>
    </div>
  );
};

export default Logo;