#!/bin/bash

# AWS S3 Deployment Script for HomeFax Frontend
# This script builds and deploys the HomeFax frontend to AWS S3

# Exit on error
set -e

# Default values
ENVIRONMENT="mock"
S3_BUCKET=""
CLOUDFRONT_ID=""
PROFILE="default"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  key="$1"
  case $key in
    -e|--environment)
      ENVIRONMENT="$2"
      shift
      shift
      ;;
    -b|--bucket)
      S3_BUCKET="$2"
      shift
      shift
      ;;
    -c|--cloudfront)
      CLOUDFRONT_ID="$2"
      shift
      shift
      ;;
    -p|--profile)
      PROFILE="$2"
      shift
      shift
      ;;
    -h|--help)
      echo "Usage: ./aws-deploy.sh [options]"
      echo "Options:"
      echo "  -e, --environment   Environment to deploy (mock or production, default: mock)"
      echo "  -b, --bucket        S3 bucket name (required)"
      echo "  -c, --cloudfront    CloudFront distribution ID (optional)"
      echo "  -p, --profile       AWS CLI profile (default: default)"
      echo "  -h, --help          Show this help message"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# Validate required parameters
if [ -z "$S3_BUCKET" ]; then
  echo "Error: S3 bucket name is required. Use -b or --bucket to specify."
  exit 1
fi

# Set environment-specific variables
if [ "$ENVIRONMENT" == "prod" ]; then
  BUILD_COMMAND="npm run build:production"
  echo "Deploying PRODUCTION build to S3 bucket: $S3_BUCKET"
else
  BUILD_COMMAND="npm run build:mock"
  echo "Deploying MOCK build to S3 bucket: $S3_BUCKET"
fi

# Build the application
echo "Building application..."
$BUILD_COMMAND

# Deploy to S3
echo "Deploying to S3..."
aws s3 sync build/ s3://$S3_BUCKET --delete --profile $PROFILE

# Invalidate CloudFront cache if distribution ID is provided
if [ -n "$CLOUDFRONT_ID" ]; then
  echo "Invalidating CloudFront cache..."
  aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*" --profile $PROFILE
fi

echo "Deployment completed successfully!"