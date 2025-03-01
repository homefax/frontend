import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ThemeContext } from '../context/ThemeContext';

const HomePage: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  return (
    <div className="home-page">
      <Header />
      
      <main>
        <section className="hero-section">
          {isDarkMode && (
            <>
              <div className="blockchain-connection" style={{ top: '20%', left: '10%' }}></div>
              <div className="blockchain-connection" style={{ top: '40%', right: '10%', animationDelay: '1s' }}></div>
              <div className="blockchain-connection" style={{ top: '60%', left: '20%', animationDelay: '2s' }}></div>
              <div className="blockchain-connection" style={{ top: '80%', right: '20%', animationDelay: '3s' }}></div>
            </>
          )}
          <div className="hero-content">
            <h1>HomeFax</h1>
            <h2>Because Every House Has a Past.</h2>
            <p>
              A comprehensive, blockchain-based solution for verifiable property histories.
              HomeFax empowers buyers, protects lenders, and ensures seamless property transactions.
            </p>
            <div className="hero-buttons">
              <Link to="/properties" className="button primary-button">
                Explore Properties
              </Link>
              <Link to="/auth" className="button secondary-button">
                Sign Up
              </Link>
            </div>
          </div>
        </section>
        
        <section className="features-section">
          <h2>Why Choose HomeFax?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <img
                  src='/blockchain.png'
                  alt="Blockchain"
                  style={{ width: '40%', height: '40%', objectFit: 'contain' }}
                />
              </div>
              <h3>Secure Blockchain Technology</h3>
              <p>All property records are stored on a tamper-proof blockchain ledger, ensuring data integrity and security.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <img
                  src='/history.png'
                  alt="History"
                  style={{ width: '40%', height: '40%', objectFit: 'contain' }}
                />
              </div>
              <h3>Comprehensive Property History</h3>
              <p>Access complete ownership records, renovations, insurance claims, title status, and environmental risks.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <img
                  src='/think.png'
                  alt="Think"
                  style={{ width: '40%', height: '40%', objectFit: 'contain' }}
                />
              </div>
              <h3>AI-Powered Insights</h3>
              <p>Our AI technology standardizes and analyzes property inspection reports to provide valuable recommendations.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <img
                  src='/exchange.png'
                  alt="Exchange"
                  style={{ width: '40%', height: '40%', objectFit: 'contain' }}
                />
              </div>
              <h3>Transparent Transactions</h3>
              <p>Smart contracts ensure automatic and secure distribution of payments between all parties involved.</p>
            </div>
          </div>
        </section>
        
        <section className="how-it-works-section">
          <h2>How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Connect Your Wallet</h3>
              <p>Sign up using your email or connect your crypto wallet to access the HomeFax platform.</p>
              {isDarkMode && <div className="blockchain-connection" style={{ bottom: '20%', width: '50%', animationDelay: '0.5s' }}></div>}
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <h3>Search Properties</h3>
              <p>Find properties by address, location, or specific criteria to view their comprehensive history.</p>
              {isDarkMode && <div className="blockchain-connection" style={{ bottom: '20%', width: '50%', animationDelay: '1.5s' }}></div>}
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <h3>Access Reports</h3>
              <p>Purchase access to detailed property reports using cryptocurrency or traditional payment methods.</p>
              {isDarkMode && <div className="blockchain-connection" style={{ bottom: '20%', width: '50%', animationDelay: '2.5s' }}></div>}
            </div>
            
            <div className="step">
              <div className="step-number">4</div>
              <h3>Make Informed Decisions</h3>
              <p>Use the verified property information to make confident real estate decisions without hidden surprises.</p>
              {isDarkMode && <div className="blockchain-connection" style={{ bottom: '20%', width: '50%', animationDelay: '3.5s' }}></div>}
            </div>
          </div>
        </section>
        
        <section className="features-section">
          <div className="cta-content">
            <h2>Ready to discover the truth about your next property?</h2>
            <p>Join HomeFax today and never worry about hidden property issues again.</p>
            <Link to="/auth" className="button primary-button">
              Get Started
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;