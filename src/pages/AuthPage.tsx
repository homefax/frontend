import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

enum AuthMode {
  SIGNIN = 'signin',
  SIGNUP = 'signup'
}

enum AuthOption {
  EMAIL = 'email',
  GMAIL = 'gmail',
  WALLET = 'wallet'
}

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>(AuthMode.SIGNIN);
  const [authOption, setAuthOption] = useState<AuthOption>(AuthOption.EMAIL);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const toggleMode = () => {
    setMode(mode === AuthMode.SIGNIN ? AuthMode.SIGNUP : AuthMode.SIGNIN);
    setError('');
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (authOption === AuthOption.EMAIL && (!email || !password)) {
      setError('Please fill in all fields');
      return;
    }
    
    if (authOption === AuthOption.EMAIL && mode === AuthMode.SIGNUP && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(`Attempting to ${mode} with ${authOption}: ${email}`);
      
      // For demo purposes, just clear the form and redirect to properties page
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      setIsLoading(false);
      
      // Redirect to properties page
      navigate('/properties');
    }, 1500);
  };
  
  const handleGmailAuth = () => {
    setAuthOption(AuthOption.GMAIL);
    setIsLoading(true);
    
    // Simulate Gmail authentication
    setTimeout(() => {
      console.log('Authenticating with Gmail');
      setIsLoading(false);
      
      // Redirect to properties page
      navigate('/properties');
    }, 1000);
  };
  
  const handleWalletAuth = () => {
    setAuthOption(AuthOption.WALLET);
    setIsLoading(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      console.log('Connecting wallet');
      setIsLoading(false);
      
      // Redirect to properties page
      navigate('/properties');
    }, 1000);
  };
  
  return (
    <div className="auth-page">
      <Header />
      
      <main className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>{mode === AuthMode.SIGNIN ? 'Sign In' : 'Sign Up'}</h2>
            <p>
              {mode === AuthMode.SIGNIN 
                ? 'Welcome back! Please sign in to continue.' 
                : 'Create an account to get started with HomeFax.'}
            </p>
          </div>
          
          <div className="auth-options">
            <button 
              className={`auth-option-btn email-btn ${authOption === AuthOption.EMAIL ? 'active' : ''}`}
              onClick={() => setAuthOption(AuthOption.EMAIL)}
              disabled={isLoading}
            >
              <i className="icon-email"></i>
              Continue with Email
            </button>
            <button 
              className={`auth-option-btn gmail-btn ${authOption === AuthOption.GMAIL ? 'active' : ''}`}
              onClick={handleGmailAuth}
              disabled={isLoading}
            >
              <i className="icon-gmail"></i>
              Continue with Gmail
            </button>
            <button 
              className={`auth-option-btn wallet-btn ${authOption === AuthOption.WALLET ? 'active' : ''}`}
              onClick={handleWalletAuth}
              disabled={isLoading}
            >
              <i className="icon-wallet"></i>
              Connect Wallet
            </button>
          </div>
          
          {authOption === AuthOption.EMAIL && (
            <form className="auth-form" onSubmit={handleSubmit}>
              {error && <div className="auth-error">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>
              
              {mode === AuthMode.SIGNUP && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder="Confirm your password"
                    required
                    disabled={isLoading}
                  />
                </div>
              )}
              
              {mode === AuthMode.SIGNIN && (
                <div className="forgot-password">
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>
              )}
              
              <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                {isLoading ? 'Processing...' : mode === AuthMode.SIGNIN ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
          )}
          
          {authOption === AuthOption.GMAIL && (
            <div className="auth-message">
              <p>Redirecting to Google authentication...</p>
              <div className="loading-spinner"></div>
            </div>
          )}
          
          {authOption === AuthOption.WALLET && (
            <div className="auth-message">
              <p>Please connect your wallet to continue.</p>
              <p className="auth-wallet-note">Make sure you have MetaMask or another Web3 wallet installed.</p>
              <div className="loading-spinner"></div>
            </div>
          )}
          
          <div className="auth-footer">
            {mode === AuthMode.SIGNIN ? (
              <p>
                Don't have an account?{' '}
                <button className="toggle-mode-btn" onClick={toggleMode} disabled={isLoading}>
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button className="toggle-mode-btn" onClick={toggleMode} disabled={isLoading}>
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthPage;