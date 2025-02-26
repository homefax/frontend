import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 200, height = 200 }) => {
  return (
    <div className="logo-container" style={{ width, height }}>
      <div className="logo-text" style={{ 
        fontFamily: 'Arial, sans-serif', 
        fontWeight: 'bold', 
        fontSize: `${width / 12}px`,
        color: '#2A5082',
        textAlign: 'center',
        marginTop: '10px'
      }}>
      </div>
    </div>
  );
};

export default Logo;