# HomeFax Frontend

This is the frontend application for the HomeFax platform, a blockchain-based property history solution.

## Technology Stack

- React with TypeScript
- Web3 integration for crypto wallet connections
- React Router for navigation
- Redux Toolkit for state management
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
5. Update the environment variables in the `.env` file as needed

### Running the Application

To start the development server:

```bash
npm start
# or
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `build/` directory.

## Project Structure

```
frontend/
├── public/             # Static files
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── store/          # Redux store
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main application component
│   └── index.tsx       # Entry point
├── .env.example        # Example environment variables
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Key Features

- User authentication (email/password and crypto wallet)
- Property search and browsing
- Report viewing and purchasing
- User dashboard
- Blockchain integration

## Available Scripts

- `npm start` - Starts the development server
- `npm run build` - Builds the app for production
- `npm test` - Runs tests
- `npm run lint` - Lints the code
- `npm run lint:fix` - Fixes linting issues
- `npm run format` - Formats code with Prettier
- `npm run analyze` - Analyzes bundle size
- `npm run prepare-release` - Prepares for release (lint, test, build)

## Learn More

For more information about the HomeFax platform, see the main [README.md](../README.md) file.
