import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import * as onchainkit from '@coinbase/onchainkit';

interface SmartWalletAuthProps {
  onWalletCreated: (address: string) => void;
  onWalletConnected: (address: string) => void;
  onError: (error: string) => void;
}

const SmartWalletAuth: React.FC<SmartWalletAuthProps> = ({
  onWalletCreated,
  onWalletConnected,
  onError
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Initialize web3modal
  const getWeb3Modal = () => {
    const web3Modal = new Web3Modal({
      network: 'base-goerli', // Base Goerli testnet
      cacheProvider: true,
      providerOptions: {}
    });
    return web3Modal;
  };

  // Connect existing wallet
  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      const web3Modal = getWeb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        onWalletConnected(accounts[0]);
      } else {
        onError('No accounts found');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      onError('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  // Create a new smart wallet
  const createSmartWallet = async () => {
    try {
      setIsCreating(true);
      
      // Get a provider for Base Goerli testnet
      const provider = ethers.getDefaultProvider('https://goerli.base.org');
      
      // Generate a random wallet
      const wallet = ethers.Wallet.createRandom().connect(provider);
      
      // In a real implementation, we would use the Coinbase Smart Wallet SDK
      // to create a smart contract wallet. For this demo, we'll just use the EOA.
      const walletAddress = wallet.address;
      
      // Store the wallet securely (in a real app, you'd use a more secure method)
      localStorage.setItem('smartWalletPrivateKey', wallet.privateKey);
      localStorage.setItem('smartWalletAddress', walletAddress);
      
      onWalletCreated(walletAddress);
    } catch (error) {
      console.error('Error creating smart wallet:', error);
      onError('Failed to create smart wallet. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  // Check if user already has a smart wallet
  useEffect(() => {
    const savedWalletAddress = localStorage.getItem('smartWalletAddress');
    if (savedWalletAddress) {
      onWalletConnected(savedWalletAddress);
    }
  }, [onWalletConnected]);

  return (
    <div className="smart-wallet-auth">
      <div className="wallet-options">
        <button 
          className="wallet-option-btn create-wallet-btn"
          onClick={createSmartWallet}
          disabled={isCreating || isConnecting}
        >
          {isCreating ? (
            <>
              <span className="loading-spinner-inline"></span>
              Creating Wallet...
            </>
          ) : (
            <>
              <span className="wallet-option-icon">🔑</span>
              Create Smart Wallet
            </>
          )}
        </button>
        
        <div className="wallet-option-separator">
          <span>or</span>
        </div>
        
        <button 
          className="wallet-option-btn connect-wallet-btn"
          onClick={connectWallet}
          disabled={isCreating || isConnecting}
        >
          {isConnecting ? (
            <>
              <span className="loading-spinner-inline"></span>
              Connecting...
            </>
          ) : (
            <>
              <span className="wallet-option-icon">🔐</span>
              Connect Existing Wallet
            </>
          )}
        </button>
      </div>
      
      <div className="wallet-info">
        <p>
          <strong>Smart Wallet:</strong> Create a wallet without installing any extensions.
          Perfect for new users.
        </p>
        <p>
          <strong>Existing Wallet:</strong> Connect your MetaMask or other Web3 wallet.
        </p>
      </div>
    </div>
  );
};

export default SmartWalletAuth;