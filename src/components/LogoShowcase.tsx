import React, { useState } from 'react';
import Logo from './Logo';
import LogoAlt from './LogoAlt';
import LogoCrypto from './LogoCrypto';

interface LogoShowcaseProps {
  showTagline?: boolean;
}

const LogoShowcase: React.FC<LogoShowcaseProps> = ({ showTagline = true }) => {
  const [selectedLogo, setSelectedLogo] = useState<'standard' | 'alt' | 'crypto'>('standard');

  const logoStyle = {
    margin: '20px 0',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'var(--card-bg, white)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  };

  const buttonStyle = (isActive: boolean) => ({
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: isActive ? 'var(--primary-color, #4FACFE)' : 'var(--button-bg, #e0e0e0)',
    color: isActive ? 'white' : 'var(--text-color, #333)',
    cursor: 'pointer',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  });

  const titleStyle = {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: 'var(--heading-color, #2A5082)',
  };

  const descriptionStyle = {
    fontSize: '0.9rem',
    textAlign: 'center' as const,
    maxWidth: '600px',
    color: 'var(--text-color, #666)',
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>HomeFax Logo Variants</h2>
      <p style={descriptionStyle}>
        Choose between different logo styles for the HomeFax platform.
      </p>

      <div style={buttonGroupStyle}>
        <button 
          style={buttonStyle(selectedLogo === 'standard')}
          onClick={() => setSelectedLogo('standard')}
        >
          Standard Logo
        </button>
        <button 
          style={buttonStyle(selectedLogo === 'alt')}
          onClick={() => setSelectedLogo('alt')}
        >
          Alternative Logo
        </button>
        <button 
          style={buttonStyle(selectedLogo === 'crypto')}
          onClick={() => setSelectedLogo('crypto')}
        >
          Crypto Logo
        </button>
      </div>

      <div style={logoStyle}>
        {selectedLogo === 'standard' && (
          <div>
            <Logo showTagline={showTagline} width={300} height={100} />
            <p style={descriptionStyle}>
              The standard HomeFax logo featuring a house with blockchain elements.
            </p>
          </div>
        )}
        
        {selectedLogo === 'alt' && (
          <div>
            <LogoAlt showTagline={showTagline} width={300} height={100} />
            <p style={descriptionStyle}>
              An alternative version of the HomeFax logo with a different house design.
            </p>
          </div>
        )}
        
        {selectedLogo === 'crypto' && (
          <div>
            <LogoCrypto showTagline={showTagline} width={300} height={100} />
            <p style={descriptionStyle}>
              A blockchain-inspired logo featuring the letters H and F in a hexagonal design.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoShowcase;