/**
 * Application configuration
 * This file contains configuration settings for the application
 */

// Determine if we should use mock data based on environment variable
export const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === "true";

// API endpoints
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001/api";

// AWS S3 configuration for assets
export const S3_BUCKET = process.env.REACT_APP_S3_BUCKET || "homefax-assets";
export const S3_REGION = process.env.REACT_APP_S3_REGION || "us-east-1";

// Blockchain configuration
export const BLOCKCHAIN_CONFIG = {
  contractAddress:
    process.env.REACT_APP_CONTRACT_ADDRESS ||
    "0x0000000000000000000000000000000000000000",
  rpcUrl: process.env.REACT_APP_RPC_URL || "https://goerli.base.org",
  chainId: process.env.REACT_APP_CHAIN_ID || "84531", // Base Goerli testnet
  networkName: process.env.REACT_APP_NETWORK_NAME || "Base Goerli",
  blockExplorerUrl:
    process.env.REACT_APP_BLOCK_EXPLORER_URL || "https://goerli.basescan.org",
};

// EthStorage configuration
export const ETHSTORAGE_CONFIG = {
  rpcUrl:
    process.env.REACT_APP_ETHSTORAGE_RPC_URL ||
    "https://rpc.beta.testnet.l2.quarkchain.io:8545",
};

// Feature flags
export const FEATURES = {
  enableBlockchainVerification: true,
  enableReportPurchase: true, // Enable for both mock and real mode
  enablePropertySearch: true,
  enableWalletConnection: true,
};

// Application version
export const APP_VERSION = process.env.REACT_APP_VERSION || "0.1.0";

// Environment name
export const ENVIRONMENT = process.env.NODE_ENV || "development";
export const IS_PRODUCTION = ENVIRONMENT === "production";
export const IS_DEVELOPMENT = ENVIRONMENT === "development";
export const IS_TEST = ENVIRONMENT === "test";

// Log configuration info in development
if (IS_DEVELOPMENT) {
  console.log("App Configuration:", {
    useMockData: USE_MOCK_DATA,
    apiBaseUrl: API_BASE_URL,
    environment: ENVIRONMENT,
    features: FEATURES,
    blockchain: {
      contractAddress: BLOCKCHAIN_CONFIG.contractAddress,
      chainId: BLOCKCHAIN_CONFIG.chainId,
      network: BLOCKCHAIN_CONFIG.networkName,
    },
    version: APP_VERSION,
  });
}
