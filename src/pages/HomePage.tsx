import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Logo from '../components/Logo';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Header />
      
      <main>
        <section className="hero-section">
          <div className="hero-content">
            <Logo width={150} height={150} />
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
              <div className="feature-icon">🔒</div>
              <h3>Secure Blockchain Technology</h3>
              <p>All property records are stored on a tamper-proof blockchain ledger, ensuring data integrity and security.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>Comprehensive Property History</h3>
              <p>Access complete ownership records, renovations, insurance claims, title status, and environmental risks.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered Insights</h3>
              <p>Our AI technology standardizes and analyzes property inspection reports to provide valuable recommendations.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💰</div>
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
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <h3>Search Properties</h3>
              <p>Find properties by address, location, or specific criteria to view their comprehensive history.</p>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <h3>Access Reports</h3>
              <p>Purchase access to detailed property reports using cryptocurrency or traditional payment methods.</p>
            </div>
            
            <div className="step">
              <div className="step-number">4</div>
              <h3>Make Informed Decisions</h3>
              <p>Use the verified property information to make confident real estate decisions without hidden surprises.</p>
            </div>
          </div>
        </section>
        
        <section className="cta-section">
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