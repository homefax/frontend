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

// Feature flags
export const FEATURES = {
  enableBlockchainVerification: true,
  enableReportPurchase: USE_MOCK_DATA, // Only enable in mock mode for now
  enablePropertySearch: true,
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
    version: APP_VERSION,
  });
}
