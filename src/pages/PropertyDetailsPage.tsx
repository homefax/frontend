import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import apiService, { Property } from '../services/api';

interface Report {
  id: string;
  propertyId: string;
  title: string;
  reportType: string;
  description: string;
  creator: {
    id: string;
    name: string;
  };
  price: number;
  createdAt: string;
  isVerified: boolean;
  purchased: boolean;
}

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Fetch property details
        const propertyData = await apiService.properties.getById(id);
        setProperty(propertyData);
        
        // Fetch property reports
        const reportsData = await apiService.reports.getByPropertyId(id);
        setReports(reportsData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching property details:', err);
        setError('Failed to load property details. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchPropertyDetails();
  }, [id]);
  
  const handlePurchaseReport = async (reportId: string) => {
    try {
      // In a real app, you would integrate with a payment system
      // For now, we'll just simulate a successful purchase with crypto
      await apiService.reports.purchase(reportId, {
        paymentMethod: 'crypto',
        transactionHash: 'mock-transaction-hash'
      });
      
      // Update the reports list to show the report as purchased
      setReports(prevReports => 
        prevReports.map(report => 
          report.id === reportId ? { ...report, purchased: true } : report
        )
      );
    } catch (err) {
      console.error('Error purchasing report:', err);
      alert('Failed to purchase report. Please try again.');
    }
  };
  
  if (loading) {
    return (
      <div className="property-details-page">
        <Header />
        <main className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading property details...</p>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !property) {
    return (
      <div className="property-details-page">
        <Header />
        <main className="error-container">
          <h2>Error</h2>
          <p>{error || 'Property not found'}</p>
          <Link to="/properties" className="button">Back to Properties</Link>
        </main>
        <Footer />
      </div>
    );
  }
  
  const currentYear = new Date().getFullYear();
  const propertyAge = currentYear - property.yearBuilt;
  
  return (
    <div className="property-details-page">
      <Header />
      
      <main className="property-details-container">
        <div className="property-header">
          <h1>{property.address}</h1>
          <p className="property-location">{property.city}, {property.state} {property.zipCode}</p>
        </div>
        
        <div className="property-images">
          <img 
            src={property.imageUrl} 
            alt={property.address} 
            className="property-image"
          />
        </div>
        
        <div className="property-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            HomeFax Reports ({reports.length})
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="property-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Price</span>
                  <span className="detail-value">${property.price.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Bedrooms</span>
                  <span className="detail-value">{property.bedrooms}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Bathrooms</span>
                  <span className="detail-value">{property.bathrooms}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Square Feet</span>
                  <span className="detail-value">{property.squareFeet.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Year Built</span>
                  <span className="detail-value">{property.yearBuilt} ({propertyAge} years old)</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Verification</span>
                  <span className="detail-value">
                    {property.isVerified ? 
                      <span className="verified-badge">Verified on Blockchain</span> : 
                      'Unverified'}
                  </span>
                </div>
              </div>
              
              <div className="property-description">
                <h3>Description</h3>
                <p>{property.description}</p>
              </div>
            </div>
          )}
          
          {activeTab === 'reports' && (
            <div className="reports-tab">
              <div className="reports-intro">
                <h3>HomeFax Reports</h3>
                <p>
                  Access verified property reports secured on the blockchain. 
                  Each report provides valuable insights into the property's history.
                </p>
              </div>
              
              {reports.length === 0 ? (
                <div className="no-reports">
                  <p>No reports available for this property yet.</p>
                </div>
              ) : (
                <div className="reports-list">
                  {reports.map(report => (
                    <div key={report.id} className="report-card">
                      <div className="report-header">
                        <h4>{report.title}</h4>
                        {report.isVerified && (
                          <span className="verified-badge">Blockchain Verified</span>
                        )}
                      </div>
                      
                      <div className="report-details">
                        <p className="report-date">Date: {new Date(report.createdAt).toLocaleDateString()}</p>
                        <p className="report-description">{report.description}</p>
                      </div>
                      
                      <div className="report-actions">
                        {report.purchased ? (
                          <button className="view-report-btn">View Report</button>
                        ) : (
                          <div className="purchase-section">
                            <span className="report-price">${report.price}</span>
                            <button 
                              className="purchase-report-btn"
                              onClick={() => handlePurchaseReport(report.id)}
                            >
                              Purchase
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetailsPage;