import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ThemeContext } from '../context/ThemeContext';

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
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  const [mode, setMode] = useState<AuthMode>(AuthMode.SIGNIN);
  const [authOption, setAuthOption] = useState<AuthOption>(AuthOption.EMAIL);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formFocused, setFormFocused] = useState<string | null>(null);
  
  // Reset form state when switching auth options
  useEffect(() => {
    setError('');
  }, [authOption]);
  
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
  
  const handleFocus = (field: string) => {
    setFormFocused(field);
  };
  
  const handleBlur = () => {
    setFormFocused(null);
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
      
      // For demo purposes, just clear the form and redirect to dashboard page
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      setIsLoading(false);
      
      // Redirect to dashboard page
      navigate('/dashboard');
    }, 1500);
  };
  
  const handleGmailAuth = () => {
    setAuthOption(AuthOption.GMAIL);
    setIsLoading(true);
    
    // Simulate Gmail authentication
    setTimeout(() => {
      console.log('Authenticating with Gmail');
      setIsLoading(false);
      
      // Redirect to dashboard page
      navigate('/dashboard');
    }, 1000);
  };
  
  const handleWalletAuth = () => {
    setAuthOption(AuthOption.WALLET);
    setIsLoading(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      console.log('Connecting wallet');
      setIsLoading(false);
      
      // Redirect to dashboard page
      navigate('/dashboard');
    }, 1000);
  };
  
  return (
    <div className="auth-page">
      <Header />
      
      <main className="auth-container">
        {isDarkMode && (
          <>
            <div className="blockchain-connection" style={{ top: '10%', left: '20%', width: '30%' }}></div>
            <div className="blockchain-connection" style={{ top: '30%', right: '15%', width: '25%', animationDelay: '1s' }}></div>
            <div className="blockchain-connection" style={{ bottom: '25%', left: '10%', width: '20%', animationDelay: '2s' }}></div>
          </>
        )}
        
        <div className={`auth-card ${isDarkMode ? 'blockchain-card' : ''}`}>
          {isDarkMode && (
            <div className="blockchain-glow"></div>
          )}
          
          <div className="auth-header">
            <h2 className={isDarkMode ? 'glow-text' : ''}>
              {mode === AuthMode.SIGNIN ? 'Sign In' : 'Sign Up'}
            </h2>
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
              <span className="auth-option-icon">✉️</span>
              Continue with Email
            </button>
            <button
              className={`auth-option-btn gmail-btn ${authOption === AuthOption.GMAIL ? 'active' : ''}`}
              onClick={handleGmailAuth}
              disabled={isLoading}
            >
              <span className="auth-option-icon">G</span>
              Continue with Gmail
            </button>
            <button
              className={`auth-option-btn wallet-btn ${authOption === AuthOption.WALLET ? 'active' : ''}`}
              onClick={handleWalletAuth}
              disabled={isLoading}
            >
              <span className="auth-option-icon">🔐</span>
              Connect Wallet
            </button>
          </div>
          
          {authOption === AuthOption.EMAIL && (
            <form className="auth-form" onSubmit={handleSubmit}>
              {error && <div className="auth-error">{error}</div>}
              
              <div className={`form-group ${formFocused === 'email' ? 'focused' : ''}`}>
                <label htmlFor="email">Email</label>
                <div className="input-container">
                  <span className="input-icon">✉️</span>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    placeholder="Enter your email"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className={`form-group ${formFocused === 'password' ? 'focused' : ''}`}>
                <label htmlFor="password">Password</label>
                <div className="input-container">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    onFocus={() => handleFocus('password')}
                    onBlur={handleBlur}
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              {mode === AuthMode.SIGNUP && (
                <div className={`form-group ${formFocused === 'confirmPassword' ? 'focused' : ''}`}>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-container">
                    <span className="input-icon">🔒</span>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      onFocus={() => handleFocus('confirmPassword')}
                      onBlur={handleBlur}
                      placeholder="Confirm your password"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}
              
              {mode === AuthMode.SIGNIN && (
                <div className="forgot-password">
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>
              )}
              
              <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="loading-spinner-inline"></span>
                    Processing...
                  </>
                ) : (
                  mode === AuthMode.SIGNIN ? 'Sign In' : 'Sign Up'
                )}
              </button>
            </form>
          )}
          
          {authOption === AuthOption.GMAIL && (
            <div className="auth-message">
              <div className="auth-message-icon">G</div>
              <p>Redirecting to Google authentication...</p>
              <div className="loading-spinner"></div>
            </div>
          )}
          
          {authOption === AuthOption.WALLET && (
            <div className="auth-message">
              <div className="auth-message-icon">🔐</div>
              <p>Please connect your wallet to continue.</p>
              <p className="auth-wallet-note">Make sure you have MetaMask or another Web3 wallet installed.</p>
              <div className="loading-spinner"></div>
              {isDarkMode && (
                <div className="blockchain-connection" style={{ bottom: '10%', width: '50%', animationDelay: '0.5s' }}></div>
              )}
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