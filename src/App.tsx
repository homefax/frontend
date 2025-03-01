import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/WalletAuth.css';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import PropertiesPage from './pages/PropertiesPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ReportsPage from './pages/reports/ReportsPage';
import ActivityPage from './pages/activity/ActivityPage';

// Components
import DAOGovernance from './components/DAOGovernance';

// Placeholder for future pages
const AboutPage = () => <div>About Page (Coming Soon)</div>;
const PrivacyPage = () => <div>Privacy Policy (Coming Soon)</div>;
const TermsPage = () => <div>Terms of Service (Coming Soon)</div>;
const NotFoundPage = () => <div>404 - Page Not Found</div>;

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetailsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/governance" element={<DAOGovernance />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
