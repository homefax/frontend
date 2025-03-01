import React, { useState, useEffect } from 'react';
import * as onchainkit from '@coinbase/onchainkit';

interface OnchainKitIntegrationProps {
  walletAddress: string;
}

const OnchainKitIntegration: React.FC<OnchainKitIntegrationProps> = ({
  walletAddress
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [nftData, setNftData] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching NFT data using OnchainKit
    const fetchNFTData = async () => {
      try {
        setIsLoading(true);
        
        // In a real implementation, we would use the OnchainKit to fetch NFT data
        // For this demo, we'll simulate it
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate NFT data
        setNftData({
          count: 3,
          collections: [
            {
              name: 'Base Avatars',
              tokenId: '1234',
              imageUrl: 'https://placehold.co/100x100/2d81ff/ffffff?text=Base'
            },
            {
              name: 'Coinbase NFT',
              tokenId: '5678',
              imageUrl: 'https://placehold.co/100x100/0052ff/ffffff?text=CB'
            },
            {
              name: 'HomeFax Verified',
              tokenId: '9012',
              imageUrl: 'https://placehold.co/100x100/00a854/ffffff?text=HF'
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching NFT data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (walletAddress) {
      fetchNFTData();
    }
  }, [walletAddress]);

  if (isLoading) {
    return (
      <div className="onchainkit-loading">
        <div className="loading-spinner"></div>
        <p>Loading your on-chain data...</p>
      </div>
    );
  }

  return (
    <div className="onchainkit-integration">
      <h3>Your On-Chain Assets</h3>
      <p>Connected with OnchainKit</p>
      
      {nftData && (
        <div className="nft-collections">
          <p>You own {nftData.count} NFTs across various collections:</p>
          
          <div className="nft-grid">
            {nftData.collections.map((nft: any, index: number) => (
              <div key={index} className="nft-item">
                <img src={nft.imageUrl} alt={nft.name} className="nft-image" />
                <div className="nft-details">
                  <div className="nft-name">{nft.name}</div>
                  <div className="nft-id">#{nft.tokenId}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="onchainkit-info">
            <p>
              <strong>OnchainKit</strong> provides easy access to on-chain data and assets.
            </p>
            <p>
              Your wallet is now connected to the Base ecosystem, allowing you to interact
              with decentralized applications seamlessly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnchainKitIntegration;