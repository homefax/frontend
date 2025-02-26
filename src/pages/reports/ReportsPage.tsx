import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Reports.css';

interface Report {
  id: string;
  title: string;
  propertyId: string;
  propertyAddress: string;
  date: string;
  type: string;
  status: 'interested' | 'purchased' | 'uploaded' | 'verified';
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Home Inspection Report',
    propertyId: '1',
    propertyAddress: '123 Blockchain Street, Crypto City, CA',
    date: '2025-01-15',
    type: 'inspection',
    status: 'purchased'
  },
  {
    id: '2',
    title: 'Title History',
    propertyId: '2',
    propertyAddress: '456 Ethereum Avenue, Blockchain Heights, NY',
    date: '2025-02-10',
    type: 'title',
    status: 'interested'
  },
  {
    id: '3',
    title: 'Renovation Records',
    propertyId: '3',
    propertyAddress: '789 Bitcoin Boulevard, DeFi District, TX',
    date: '2025-01-20',
    type: 'renovation',
    status: 'uploaded'
  },
  {
    id: '4',
    title: 'Environmental Assessment',
    propertyId: '4',
    propertyAddress: '101 NFT Lane, Metaverse City, CA',
    date: '2025-02-05',
    type: 'environmental',
    status: 'purchased'
  },
  {
    id: '5',
    title: 'Property Valuation',
    propertyId: '5',
    propertyAddress: '202 Smart Contract Court, Token Town, WA',
    date: '2025-01-30',
    type: 'valuation',
    status: 'interested'
  },
  {
    id: '6',
    title: 'Structural Inspection',
    propertyId: '1',
    propertyAddress: '123 Blockchain Street, Crypto City, CA',
    date: '2025-02-20',
    type: 'inspection',
    status: 'verified'
  },
  {
    id: '7',
    title: 'Flood Risk Assessment',
    propertyId: '3',
    propertyAddress: '789 Bitcoin Boulevard, DeFi District, TX',
    date: '2025-02-15',
    type: 'environmental',
    status: 'verified'
  },
  {
    id: '8',
    title: 'Historical Property Records',
    propertyId: '2',
    propertyAddress: '456 Ethereum Avenue, Blockchain Heights, NY',
    date: '2025-01-25',
    type: 'title',
    status: 'uploaded'
  }
];

const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'interested' | 'purchased' | 'uploaded' | 'verified'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter reports based on active tab and search term
  const filteredReports = mockReports.filter(report => {
    const matchesTab = activeTab === 'all' || report.status === activeTab;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
  
  return (
    <div className="reports-page">
      <Header />
      
      <main className="reports-container">
        <div className="reports-header">
          <h1>Reports</h1>
          <Link to="/dashboard" className="back-to-dashboard">
            Back to Dashboard
          </Link>
        </div>
        
        <div className="reports-search">
          <input
            type="text"
            placeholder="Search reports by title, address, or type"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="reports-tabs">
          <button 
            className={activeTab === 'all' ? 'active' : ''}
            onClick={() => setActiveTab('all')}
          >
            All Reports
          </button>
          <button 
            className={activeTab === 'interested' ? 'active' : ''}
            onClick={() => setActiveTab('interested')}
          >
            Interested
          </button>
          <button 
            className={activeTab === 'purchased' ? 'active' : ''}
            onClick={() => setActiveTab('purchased')}
          >
            Purchased
          </button>
          <button 
            className={activeTab === 'uploaded' ? 'active' : ''}
            onClick={() => setActiveTab('uploaded')}
          >
            Uploaded
          </button>
          <button 
            className={activeTab === 'verified' ? 'active' : ''}
            onClick={() => setActiveTab('verified')}
          >
            Verified
          </button>
        </div>
        
        {filteredReports.length === 0 ? (
          <div className="no-reports">
            <p>No reports found matching your criteria.</p>
          </div>
        ) : (
          <div className="reports-grid">
            {filteredReports.map(report => (
              <div key={report.id} className="report-card">
                <div className="report-header">
                  <h3>{report.title}</h3>
                  <span className={`report-type ${report.type}`}>{report.type}</span>
                </div>
                <div className="report-property">
                  <Link to={`/properties/${report.propertyId}`}>
                    {report.propertyAddress}
                  </Link>
                </div>
                <div className="report-date">
                  Date: {new Date(report.date).toLocaleDateString()}
                </div>
                <div className="report-status">
                  <span className={`status-badge ${report.status}`}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </span>
                </div>
                <div className="report-actions">
                  {report.status === 'interested' && (
                    <button className="purchase-btn">Purchase</button>
                  )}
                  {report.status === 'purchased' && (
                    <button className="view-btn">View Report</button>
                  )}
                  {report.status === 'uploaded' && (
                    <div className="uploaded-badge">Uploaded by you</div>
                  )}
                  {report.status === 'verified' && (
                    <div className="verified-badge">
                      <span className="verified-icon">✓</span> Blockchain Verified
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ReportsPage;