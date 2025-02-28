import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ThemeContext } from '../../context/ThemeContext';
import './Activity.css';

interface Activity {
  id: string;
  type: 'purchase' | 'upload' | 'interest' | 'verification' | 'ai_processing';
  description: string;
  date: string;
  propertyId?: string;
  reportId?: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'purchase',
    description: 'Purchased Home Inspection Report for 123 Blockchain Street',
    date: '2025-02-25T14:30:00Z',
    propertyId: '1',
    reportId: '1'
  },
  {
    id: '2',
    type: 'upload',
    description: 'Uploaded Renovation Records for 789 Bitcoin Boulevard',
    date: '2025-02-20T10:15:00Z',
    propertyId: '3',
    reportId: '3'
  },
  {
    id: '3',
    type: 'interest',
    description: 'Marked interest in Title History for 456 Ethereum Avenue',
    date: '2025-02-18T16:45:00Z',
    propertyId: '2',
    reportId: '2'
  },
  {
    id: '4',
    type: 'verification',
    description: 'Property at 123 Blockchain Street verified on blockchain',
    date: '2025-02-15T09:20:00Z',
    propertyId: '1'
  },
  {
    id: '5',
    type: 'ai_processing',
    description: 'AI processed and standardized Home Inspection Report',
    date: '2025-02-10T11:30:00Z',
    reportId: '1'
  },
  {
    id: '6',
    type: 'verification',
    description: 'Structural Inspection Report verified on blockchain',
    date: '2025-02-22T13:45:00Z',
    reportId: '6'
  },
  {
    id: '7',
    type: 'purchase',
    description: 'Purchased Environmental Assessment for 101 NFT Lane',
    date: '2025-02-08T15:20:00Z',
    propertyId: '4',
    reportId: '4'
  },
  {
    id: '8',
    type: 'interest',
    description: 'Marked interest in Property Valuation for 202 Smart Contract Court',
    date: '2025-02-05T10:10:00Z',
    propertyId: '5',
    reportId: '5'
  },
  {
    id: '9',
    type: 'upload',
    description: 'Uploaded Historical Property Records for 456 Ethereum Avenue',
    date: '2025-01-28T14:15:00Z',
    propertyId: '2',
    reportId: '8'
  },
  {
    id: '10',
    type: 'ai_processing',
    description: 'AI processed and standardized Flood Risk Assessment',
    date: '2025-02-17T09:45:00Z',
    reportId: '7'
  }
];

const ActivityPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'purchase' | 'upload' | 'interest' | 'verification' | 'ai_processing'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useContext(ThemeContext);
  
  // Filter activities based on active filter and search term
  const filteredActivities = mockActivities.filter(activity => {
    const matchesFilter = activeFilter === 'all' || activity.type === activeFilter;
    const matchesSearch = activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
  
  // Group activities by date
  const groupedActivities: { [key: string]: Activity[] } = {};
  
  filteredActivities.forEach(activity => {
    const date = new Date(activity.date).toLocaleDateString();
    if (!groupedActivities[date]) {
      groupedActivities[date] = [];
    }
    groupedActivities[date].push(activity);
  });
  
  // Sort dates in descending order
  const sortedDates = Object.keys(groupedActivities).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });
  
  // Function to get icon for activity type
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'purchase':
        return '💰';
      case 'upload':
        return '📤';
      case 'interest':
        return '⭐';
      case 'verification':
        return '✓';
      case 'ai_processing':
        return '🤖';
      default:
        return '📋';
    }
  };

  // Function to get color class for activity type
  const getActivityColorClass = (type: Activity['type']) => {
    return `activity-icon-${type}`;
  };
  
  return (
    <div className="activity-page">
      <Header />
      
      <main className="activity-container">
        <div className="activity-header">
          <h1>Activity</h1>
          <Link to="/dashboard" className="back-to-dashboard">
            <span className="back-icon">←</span> Back to Dashboard
          </Link>
        </div>
        
        <div className="activity-search">
          <div className="search-icon">🔍</div>
          <input
            type="text"
            placeholder="Search activity"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        
        <div className="activity-filters">
          <button
            className={activeFilter === 'all' ? 'active' : ''}
            onClick={() => setActiveFilter('all')}
          >
            All Activity
          </button>
          <button
            className={activeFilter === 'purchase' ? 'active' : ''}
            onClick={() => setActiveFilter('purchase')}
          >
            <span className="filter-icon">💰</span> Purchases
          </button>
          <button
            className={activeFilter === 'upload' ? 'active' : ''}
            onClick={() => setActiveFilter('upload')}
          >
            <span className="filter-icon">📤</span> Uploads
          </button>
          <button
            className={activeFilter === 'interest' ? 'active' : ''}
            onClick={() => setActiveFilter('interest')}
          >
            <span className="filter-icon">⭐</span> Interests
          </button>
          <button
            className={activeFilter === 'verification' ? 'active' : ''}
            onClick={() => setActiveFilter('verification')}
          >
            <span className="filter-icon">✓</span> Verifications
          </button>
          <button
            className={activeFilter === 'ai_processing' ? 'active' : ''}
            onClick={() => setActiveFilter('ai_processing')}
          >
            <span className="filter-icon">🤖</span> AI Processing
          </button>
        </div>
        
        {sortedDates.length === 0 ? (
          <div className={`no-activity ${theme === 'dark' ? 'blockchain-card' : ''}`}>
            {theme === 'dark' && <div className="blockchain-glow"></div>}
            <div className="empty-state-icon">📋</div>
            <p>No activity found matching your criteria.</p>
            <button
              className="reset-filters-btn"
              onClick={() => {
                setActiveFilter('all');
                setSearchTerm('');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="activity-count">
              Showing {filteredActivities.length} {filteredActivities.length === 1 ? 'activity' : 'activities'}
              {activeFilter !== 'all' && ` • ${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1).replace('_', ' ')}`}
              {searchTerm && ` • Search: "${searchTerm}"`}
            </div>
            <div className="activity-timeline">
              {sortedDates.map(date => (
                <div key={date} className="activity-day">
                  <div className="activity-date">
                    <span className="date-icon">📅</span> {date}
                  </div>
                  <div className="activity-items">
                    {groupedActivities[date].map(activity => (
                      <div key={activity.id} className={`activity-item ${theme === 'dark' ? 'blockchain-card' : ''}`}>
                        {theme === 'dark' && <div className="blockchain-glow"></div>}
                        <div className={`activity-icon ${getActivityColorClass(activity.type)}`}>
                          {getActivityIcon(activity.type)}
                          {theme === 'dark' && activity.type === 'verification' && (
                            <div className="verification-pulse"></div>
                          )}
                        </div>
                        <div className="activity-content">
                          <div className="activity-description">{activity.description}</div>
                          <div className="activity-time">
                            <span className="time-icon">🕒</span> {new Date(activity.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="activity-links">
                            {activity.propertyId && (
                              <Link to={`/properties/${activity.propertyId}`} className="activity-link">
                                <span className="link-icon">🏠</span> View Property
                              </Link>
                            )}
                            {activity.reportId && (
                              <Link to={`/reports?id=${activity.reportId}`} className="activity-link">
                                <span className="link-icon">📄</span> View Report
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ActivityPage;