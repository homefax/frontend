/**
 * AuthPage Component
 *
 * This component handles user authentication with multiple options:
 * - Email/password authentication
 * - Social media logins via Okto SDK (Facebook, Twitter, GitHub, Apple, LinkedIn, Discord, Gmail)
 * - Crypto wallet connection via Base (kept as original implementation)
 */

import React, { useState, useContext, useEffect } from 'react';
import './AuthPage.css'; // Make sure to create this CSS file
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ThemeContext } from '../context/ThemeContext';
import SmartWalletAuth from '../components/SmartWalletAuth';
import BasenamesRegistration from '../components/BasenamesRegistration';
import OnchainKitIntegration from '../components/OnchainKitIntegration';

enum AuthMode {
  SIGNIN = 'signin',
  SIGNUP = 'signup'
}

enum AuthOption {
  EMAIL = 'email',
  GMAIL = 'gmail',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  GITHUB = 'github',
  APPLE = 'apple',
  LINKEDIN = 'linkedin',
  DISCORD = 'discord',
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
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [basename, setBasename] = useState<string | null>(null);
  const [walletCreationStep, setWalletCreationStep] = useState<'wallet' | 'basename' | 'complete'>('wallet');
  
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
  
  /**
   * Handle social media authentication using Okto SDK
   *
   * This function handles authentication for various social media platforms:
   * - Facebook, Twitter, GitHub, Apple, LinkedIn, Discord
   *
   * The actual implementation would use the Okto SDK to authenticate with these platforms.
   * For now, we're simulating the authentication process.
   */
  const handleSocialAuth = (provider: AuthOption) => {
    setAuthOption(provider);
    setIsLoading(true);
    
    // In a real implementation, we would use the Okto SDK to authenticate
    // Example: okto.auth.loginWithSocial(provider);
    
    // Simulate social authentication with Okto SDK
    setTimeout(() => {
      console.log(`Authenticating with ${provider}`);
      setIsLoading(false);
      
      // Redirect to dashboard page
      navigate('/dashboard');
    }, 1000);
  };
  
  const handleWalletAuth = () => {
    setAuthOption(AuthOption.WALLET);
    setWalletCreationStep('wallet');
    setWalletAddress(null);
    setBasename(null);
    setError('');
  };
  
  const handleWalletCreated = (address: string) => {
    setWalletAddress(address);
    setWalletCreationStep('basename');
    setError('');
  };
  
  const handleWalletConnected = (address: string) => {
    setWalletAddress(address);
    
    // Check if user already has a basename
    const savedBasename = localStorage.getItem('userBasename');
    if (savedBasename) {
      setBasename(savedBasename);
      setWalletCreationStep('complete');
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setWalletCreationStep('basename');
    }
  };
  
  const handleBasenameRegistered = (name: string) => {
    setBasename(name);
    setWalletCreationStep('complete');
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
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
          
          {/*
            Social login options using icon-only buttons for a cleaner UI
            Each button has a title attribute for accessibility and to show a tooltip on hover
          */}
          <div className="auth-options">
            <button
              className={`auth-option-btn  ${authOption === AuthOption.WALLET ? 'active' : ''}`}
              onClick={handleWalletAuth}
              disabled={isLoading}
              title="Connect with Crypto Wallet"
            >
              <img
                  src='/ether-icon.png'
                  alt="Blockchain"
                  style={{ width: '40%', height: '40%', objectFit: 'contain' }}
                />
            </button>
            <button
              className={`auth-option-btn email-btn ${authOption === AuthOption.EMAIL ? 'active' : ''}`}
              onClick={() => setAuthOption(AuthOption.EMAIL)}
              disabled={isLoading}
              title="Continue with Email"
            >
              <span className="auth-option-icon">✉️</span>
            </button>
            <button
              className={`auth-option-btn gmail-btn ${authOption === AuthOption.GMAIL ? 'active' : ''}`}
              onClick={handleGmailAuth}
              disabled={isLoading}
              title="Continue with Gmail"
            >
              <span className="auth-option-icon">G</span>
            </button>
            <button
              className={`auth-option-btn facebook-btn ${authOption === AuthOption.FACEBOOK ? 'active' : ''}`}
              onClick={() => handleSocialAuth(AuthOption.FACEBOOK)}
              disabled={isLoading}
              title="Continue with Facebook"
            >
              <span className="auth-option-icon">f</span>
            </button>
            <button
              className={`auth-option-btn twitter-btn ${authOption === AuthOption.TWITTER ? 'active' : ''}`}
              onClick={() => handleSocialAuth(AuthOption.TWITTER)}
              disabled={isLoading}
              title="Continue with Twitter"
            >
              <span className="auth-option-icon">𝕏</span>
            </button>
            <button
              className={`auth-option-btn apple-btn ${authOption === AuthOption.APPLE ? 'active' : ''}`}
              onClick={() => handleSocialAuth(AuthOption.APPLE)}
              disabled={isLoading}
              title="Continue with Apple"
            >
              <span className="auth-option-icon">🍎</span>
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
          
          {authOption === AuthOption.FACEBOOK && (
            <div className="auth-message">
              <div className="auth-message-icon">f</div>
              <p>Redirecting to Facebook authentication...</p>
              <div className="loading-spinner"></div>
            </div>
          )}
          
          {authOption === AuthOption.TWITTER && (
            <div className="auth-message">
              <div className="auth-message-icon">𝕏</div>
              <p>Redirecting to Twitter authentication...</p>
              <div className="loading-spinner"></div>
            </div>
          )}
          
          {authOption === AuthOption.GITHUB && (
            <div className="auth-message">
              <div className="auth-message-icon">⌨️</div>
              <p>Redirecting to GitHub authentication...</p>
              <div className="loading-spinner"></div>
            </div>
          )}
          
          {authOption === AuthOption.APPLE && (
            <div className="auth-message">
              <div className="auth-message-icon">🍎</div>
              <p>Redirecting to Apple authentication...</p>
              <div className="loading-spinner"></div>
            </div>
          )}
          
          {authOption === AuthOption.LINKEDIN && (
            <div className="auth-message">
              <div className="auth-message-icon">in</div>
              <p>Redirecting to LinkedIn authentication...</p>
              <div className="loading-spinner"></div>
            </div>
          )}
          
          {authOption === AuthOption.DISCORD && (
            <div className="auth-message">
              <div className="auth-message-icon">🎮</div>
              <p>Redirecting to Discord authentication...</p>
              <div className="loading-spinner"></div>
            </div>
          )}
          
          {authOption === AuthOption.WALLET && (
            <div className="auth-wallet-container">
              {error && <div className="auth-error">{error}</div>}
              
              {walletCreationStep === 'wallet' && (
                <>
                  <h3>Wallet Setup</h3>
                  <p>Choose how you want to connect to the blockchain:</p>
                  <SmartWalletAuth
                    onWalletCreated={handleWalletCreated}
                    onWalletConnected={handleWalletConnected}
                    onError={setError}
                  />
                </>
              )}
              
              {walletCreationStep === 'basename' && walletAddress && (
                <>
                  <h3>Almost Done!</h3>
                  <p>Your wallet address: <code>{walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}</code></p>
                  <BasenamesRegistration
                    walletAddress={walletAddress}
                    onBasenameRegistered={handleBasenameRegistered}
                    onError={setError}
                  />
                </>
              )}
              
              {walletCreationStep === 'complete' && walletAddress && basename && (
                <div className="auth-success">
                  <div className="auth-success-icon">✅</div>
                  <h3>Setup Complete!</h3>
                  <p>Your wallet is ready to use.</p>
                  <p><strong>Wallet:</strong> {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}</p>
                  <p><strong>Basename:</strong> {basename}.base</p>
                  
                  <div className="onchainkit-container">
                    <OnchainKitIntegration walletAddress={walletAddress} />
                  </div>
                  
                  <p className="redirect-message">Redirecting to dashboard...</p>
                  <div className="loading-spinner"></div>
                </div>
              )}
              
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