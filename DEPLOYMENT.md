# HomeFax Frontend Deployment Guide

This guide provides instructions for building and deploying the HomeFax frontend application to AWS S3.

## Prerequisites

- Node.js (v16 or later)
- npm (v7 or later)
- AWS CLI installed and configured with appropriate credentials
- An S3 bucket for hosting the static website
- (Optional) CloudFront distribution for CDN

## Building the Application

The application can be built in two modes:

### Mock Mode

Mock mode uses mock data instead of connecting to a real backend API. This is useful for demonstration purposes or when the backend is not available.

```bash
# Install dependencies
npm install

# Build for mock mode
npm run build:mock
```

### Production Mode

Production mode connects to the real backend API.

```bash
# Install dependencies
npm install

# Build for production
npm run build:production
```

## Deploying to AWS S3

### Using the Deployment Script

We provide a deployment script that automates the build and deployment process:

```bash
# Make the script executable (if not already)
chmod +x aws-deploy.sh

# Deploy to S3 (mock environment)
./aws-deploy.sh --bucket your-s3-bucket-name

# Deploy to S3 (production environment)
./aws-deploy.sh --environment production --bucket your-s3-bucket-name

# Deploy with CloudFront invalidation
./aws-deploy.sh --bucket your-s3-bucket-name --cloudfront your-cloudfront-id

# Use a specific AWS profile
./aws-deploy.sh --bucket your-s3-bucket-name --profile your-aws-profile
```

### Manual Deployment

If you prefer to deploy manually:

1. Build the application in the desired mode:

   ```bash
   npm run build:mock
   # or
   npm run build:production
   ```

2. Sync the build folder with your S3 bucket:

   ```bash
   aws s3 sync build/ s3://your-s3-bucket-name --delete
   ```

3. (Optional) Invalidate CloudFront cache:
   ```bash
   aws cloudfront create-invalidation --distribution-id your-cloudfront-id --paths "/*"
   ```

## S3 Bucket Configuration

Your S3 bucket should be configured for static website hosting:

1. Enable static website hosting in the bucket properties
2. Set the index document to `index.html`
3. Set the error document to `index.html` (for SPA routing)
4. Configure the bucket policy to allow public access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-s3-bucket-name/*"
    }
  ]
}
```

## CloudFront Configuration (Optional)

For better performance and HTTPS support, you can set up a CloudFront distribution:

1. Create a new CloudFront distribution
2. Set the origin to your S3 bucket's website endpoint
3. Configure cache behaviors:
   - Default TTL: 86400 (1 day)
   - Compress objects automatically: Yes
   - Redirect HTTP to HTTPS: Yes
4. Set error pages:
   - 404 (Not Found) → /index.html, 200 (OK)
   - 403 (Forbidden) → /index.html, 200 (OK)

## Environment Variables

The application uses the following environment variables:

- `REACT_APP_USE_MOCK_DATA`: Set to "true" to use mock data instead of real API calls
- `REACT_APP_API_URL`: The URL of the backend API (used in production mode)
- `REACT_APP_S3_BUCKET`: S3 bucket for assets (optional)
- `REACT_APP_S3_REGION`: AWS region for the S3 bucket (optional)

These can be set in a `.env` file or during the build process.

## Troubleshooting

- **404 errors on page refresh**: Ensure your S3 bucket or CloudFront distribution is configured to redirect all requests to index.html
- **CORS issues**: Check that your backend API allows requests from your frontend domain
- **Stale content after deployment**: Make sure to invalidate the CloudFront cache after deployment
