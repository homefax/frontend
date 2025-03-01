import React, { useState } from 'react';
import { ethers } from 'ethers';

interface BasenamesRegistrationProps {
  walletAddress: string;
  onBasenameRegistered: (basename: string) => void;
  onError: (error: string) => void;
}

const BasenamesRegistration: React.FC<BasenamesRegistrationProps> = ({
  walletAddress,
  onBasenameRegistered,
  onError
}) => {
  const [basename, setBasename] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  // Check if basename is available
  const checkAvailability = async () => {
    if (!basename) {
      onError('Please enter a basename');
      return;
    }

    try {
      setIsChecking(true);
      
      // In a real implementation, we would use the Coinbase Basenames SDK
      // to check if the basename is available. For this demo, we'll simulate it.
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate availability check (random for demo purposes)
      const available = Math.random() > 0.3;
      setIsAvailable(available);
      
      if (!available) {
        onError(`The basename "${basename}" is already taken. Please try another.`);
      }
    } catch (error) {
      console.error('Error checking basename availability:', error);
      onError('Failed to check basename availability. Please try again.');
      setIsAvailable(null);
    } finally {
      setIsChecking(false);
    }
  };

  // Register basename
  const registerBasename = async () => {
    if (!basename) {
      onError('Please enter a basename');
      return;
    }

    if (isAvailable !== true) {
      onError('Please check basename availability first');
      return;
    }

    try {
      setIsRegistering(true);
      
      // In a real implementation, we would use the Coinbase Basenames SDK
      // to register the basename. For this demo, we'll simulate it.
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store the basename in local storage
      localStorage.setItem('userBasename', basename);
      
      onBasenameRegistered(basename);
    } catch (error) {
      console.error('Error registering basename:', error);
      onError('Failed to register basename. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="basenames-registration">
      <h3>Register Your Basename</h3>
      <p>
        A basename is your unique identity on Base. It's like a username that's tied to your wallet.
      </p>
      
      <div className="basename-input-group">
        <input
          type="text"
          value={basename}
          onChange={(e) => {
            setBasename(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''));
            setIsAvailable(null);
          }}
          placeholder="Enter your desired basename"
          disabled={isRegistering || isChecking}
          className="basename-input"
        />
        <span className="basename-suffix">.base</span>
      </div>
      
      <div className="basename-actions">
        <button
          className="check-availability-btn"
          onClick={checkAvailability}
          disabled={!basename || isRegistering || isChecking}
        >
          {isChecking ? (
            <>
              <span className="loading-spinner-inline"></span>
              Checking...
            </>
          ) : (
            'Check Availability'
          )}
        </button>
        
        <button
          className="register-basename-btn"
          onClick={registerBasename}
          disabled={!basename || isAvailable !== true || isRegistering || isChecking}
        >
          {isRegistering ? (
            <>
              <span className="loading-spinner-inline"></span>
              Registering...
            </>
          ) : (
            'Register Basename'
          )}
        </button>
      </div>
      
      {isAvailable === true && (
        <div className="basename-available">
          <span className="availability-icon">✅</span>
          <span>{basename}.base is available!</span>
        </div>
      )}
      
      <div className="basename-info">
        <p>
          <strong>Why register a basename?</strong>
        </p>
        <ul>
          <li>Easy to remember identity for your wallet</li>
          <li>Simpler to share than a long wallet address</li>
          <li>Works across all Base applications</li>
        </ul>
      </div>
    </div>
  );
};

export default BasenamesRegistration;