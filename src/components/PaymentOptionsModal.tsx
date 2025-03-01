import React, { useState } from 'react';
import '../styles/PaymentOptionsModal.css';

interface PaymentOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportPrice: number;
  reportTitle: string;
  onPaymentComplete: (paymentMethod: string, transactionData: any) => void;
}

const PaymentOptionsModal: React.FC<PaymentOptionsModalProps> = ({
  isOpen,
  onClose,
  reportPrice,
  reportTitle,
  onPaymentComplete
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  if (!isOpen) return null;

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
  };

  const handleConnectWallet = async () => {
    setIsProcessing(true);
    
    try {
      // Check if MetaMask or other wallet is available
      if (window.ethereum) {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
      } else {
        alert('No crypto wallet found. Please install MetaMask or another wallet provider.');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      let transactionData = {};
      
      switch (selectedMethod) {
        case 'apple-pay':
          // In a real app, this would integrate with Apple Pay SDK
          transactionData = { 
            transactionId: `apple-${Date.now()}`,
            status: 'completed'
          };
          break;
          
        case 'card':
          // In a real app, this would integrate with a payment processor
          transactionData = { 
            last4: cardDetails.cardNumber.slice(-4),
            transactionId: `card-${Date.now()}`,
            status: 'completed'
          };
          break;
          
        case 'crypto':
          if (!walletConnected) {
            alert('Please connect your wallet first');
            setIsProcessing(false);
            return;
          }
          
          // In a real app, this would create a blockchain transaction
          transactionData = { 
            walletAddress,
            transactionHash: `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
            status: 'completed'
          };
          break;
          
        default:
          throw new Error('Invalid payment method');
      }
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call the callback with payment information
      onPaymentComplete(selectedMethod, transactionData);
      
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="payment-modal-header">
          <h2>Payment Options</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="payment-details">
          <h3>{reportTitle}</h3>
          <p className="payment-price">${reportPrice.toFixed(2)}</p>
        </div>
        
        <div className="payment-methods">
          <h4>Select Payment Method</h4>
          
          <div 
            className={`payment-method-option ${selectedMethod === 'apple-pay' ? 'selected' : ''}`}
            onClick={() => handleMethodSelect('apple-pay')}
          >
            <div className="payment-method-icon apple-pay-icon">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M17.6 12.9c-.1-1.2.5-2.4 1.4-3.1-.5-.8-1.3-1.4-2.2-1.7-1-.3-2.1-.3-3 .2-.7.4-1.2.4-1.9 0-1-.5-2.1-.5-3.1-.1-1.1.5-1.9 1.4-2.3 2.5-1 2.2-.2 5.5 1.6 7.6.6.7 1.4 1.5 2.4 1.5 1 0 1.3-.6 2.4-.6 1.1 0 1.4.6 2.4.6 1 0 1.8-.8 2.4-1.5.5-.6.9-1.2 1.2-1.9-1.3-.5-2.1-1.8-2.3-3.5z"/>
                <path d="M14.5 6.3c.7-.9 1-2 .9-3.1-1.1.1-2.1.6-2.8 1.5-.7.8-1 1.9-.9 3 1.1 0 2.1-.5 2.8-1.4z"/>
              </svg>
            </div>
            <span>Apple Pay</span>
          </div>
          
          <div 
            className={`payment-method-option ${selectedMethod === 'card' ? 'selected' : ''}`}
            onClick={() => handleMethodSelect('card')}
          >
            <div className="payment-method-icon card-icon">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
              </svg>
            </div>
            <span>Credit/Debit Card</span>
          </div>
          
          <div 
            className={`payment-method-option ${selectedMethod === 'crypto' ? 'selected' : ''}`}
            onClick={() => handleMethodSelect('crypto')}
          >
            <div className="payment-method-icon crypto-icon">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>
              </svg>
            </div>
            <span>Pay with Crypto</span>
          </div>
        </div>
        
        {selectedMethod === 'card' && (
          <div className="payment-form">
            <div className="form-group">
              <label htmlFor="cardholderName">Cardholder Name</label>
              <input 
                type="text" 
                id="cardholderName" 
                name="cardholderName"
                value={cardDetails.cardholderName}
                onChange={handleCardInputChange}
                placeholder="John Doe"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input 
                type="text" 
                id="cardNumber" 
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardInputChange}
                placeholder="1234 5678 9012 3456"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input 
                  type="text" 
                  id="expiryDate" 
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleCardInputChange}
                  placeholder="MM/YY"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input 
                  type="text" 
                  id="cvv" 
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardInputChange}
                  placeholder="123"
                />
              </div>
            </div>
          </div>
        )}
        
        {selectedMethod === 'crypto' && (
          <div className="crypto-section">
            {!walletConnected ? (
              <button 
                className="connect-wallet-btn"
                onClick={handleConnectWallet}
                disabled={isProcessing}
              >
                {isProcessing ? 'Connecting...' : 'Connect Wallet'}
              </button>
            ) : (
              <div className="wallet-info">
                <p>Wallet connected</p>
                <p className="wallet-address">
                  {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                </p>
              </div>
            )}
          </div>
        )}
        
        <div className="payment-actions">
          <button className="cancel-btn" onClick={onClose} disabled={isProcessing}>
            Cancel
          </button>
          
          <button 
            className="pay-now-btn" 
            onClick={handlePayment}
            disabled={!selectedMethod || isProcessing || (selectedMethod === 'crypto' && !walletConnected)}
          >
            {isProcessing ? 'Processing...' : `Pay $${reportPrice.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptionsModal;