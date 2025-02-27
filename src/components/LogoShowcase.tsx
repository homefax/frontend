import React, { useState } from 'react';
import Logo from './Logo';
import LogoAlt from './LogoAlt';

const LogoShowcase: React.FC = () => {
  const [selectedLogo, setSelectedLogo] = useState<'hexagon' | 'home'>('hexagon');

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '20px',
      padding: '30px',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ color: '#2A5082', marginBottom: '20px' }}>HomeFax Logo Options</h2>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '40px',
        flexWrap: 'wrap'
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          padding: '20px',
          border: selectedLogo === 'hexagon' ? '2px solid #4FACFE' : '2px solid transparent',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }} 
        onClick={() => setSelectedLogo('hexagon')}
        >
          <h3 style={{ marginBottom: '15px', color: '#2A5082' }}>Option 1: Blockchain Hexagon</h3>
          <Logo width={300} height={80} />
        </div>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          padding: '20px',
          border: selectedLogo === 'home' ? '2px solid #4FACFE' : '2px solid transparent',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }} 
        onClick={() => setSelectedLogo('home')}
        >
          <h3 style={{ marginBottom: '15px', color: '#2A5082' }}>Option 2: Blockchain Home</h3>
          <LogoAlt width={300} height={80} />
        </div>
      </div>
      
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#f5f7fa', 
        borderRadius: '8px',
        width: '100%'
      }}>
        <h3 style={{ marginBottom: '10px', color: '#2A5082' }}>Selected Logo: {selectedLogo === 'hexagon' ? 'Blockchain Hexagon' : 'Blockchain Home'}</h3>
        <p style={{ marginBottom: '20px', color: '#666' }}>
          Both logos incorporate blockchain elements with the HomeFax branding. 
          The hexagon represents blockchain technology with its geometric pattern, 
          while the home shape directly relates to real estate with blockchain circuit elements.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {selectedLogo === 'hexagon' ? <Logo width={350} height={100} /> : <LogoAlt width={350} height={100} />}
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;