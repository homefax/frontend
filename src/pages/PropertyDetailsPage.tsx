import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PaymentOptionsModal from '../components/PaymentOptionsModal';
import apiService, { Property } from '../services/api';
import '../styles/PaymentOptionsModal.css';
import '../styles/ReportModal.css';

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

interface ReportContent {
  content: string;
  contentType: string;
}

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reportContent, setReportContent] = useState<ReportContent | null>(null);
  const [isViewingReport, setIsViewingReport] = useState(false);
  
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
  
  const handlePurchaseReport = (report: Report) => {
    setSelectedReport(report);
    setIsPaymentModalOpen(true);
  };
  
  const handlePaymentComplete = async (paymentMethod: string, transactionData: any) => {
    if (!selectedReport) return;
    
    try {
      // Call the API to process the payment
      await apiService.reports.purchase(selectedReport.id, {
        paymentMethod,
        ...transactionData
      });
      
      // Update the reports list to show the report as purchased
      setReports(prevReports =>
        prevReports.map(report =>
          report.id === selectedReport.id ? { ...report, purchased: true } : report
        )
      );
      
      // Close the modal and reset selected report
      setIsPaymentModalOpen(false);
      setSelectedReport(null);
    } catch (err) {
      console.error('Error purchasing report:', err);
      alert('Failed to complete purchase. Please try again.');
    }
  };
  
  const handleViewReport = async (reportId: string) => {
    try {
      // Fetch the report content
      const content = await apiService.reports.getContent(reportId);
      setReportContent(content);
      setIsViewingReport(true);
    } catch (err) {
      console.error('Error fetching report content:', err);
      alert('Failed to load report content. Please try again.');
    }
  };
  
  const closeReportView = () => {
    setIsViewingReport(false);
    setReportContent(null);
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
  
  return (
    <div className="property-details-page">
      <Header />
      
      <main className="property-details-container">
        <div className="property-header">
          <h1>{property.address}</h1>
          <p className="property-location">{property.city}, {property.state} {property.zipCode}</p>
        </div>
        
        <div className="property-image-container">
          <img 
            src={property.imageUrl} 
            alt={property.address} 
            className="property-image"
          />
        </div>
        
        <div className="property-info-section">
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
              <span className="detail-value">{property.yearBuilt}</span>
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
        
        <div className="property-reports-section">
          <h3>HomeFax Reports</h3>
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
                      <button
                        className="view-report-btn"
                        onClick={() => handleViewReport(report.id)}
                      >
                        View Report
                      </button>
                    ) : (
                      <div className="purchase-section">
                        <span className="report-price">${report.price}</span>
                        <button
                          className="purchase-report-btn"
                          onClick={() => handlePurchaseReport(report)}
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
      </main>
      
      <Footer />
      
      {/* Payment Modal */}
      {selectedReport && (
        <PaymentOptionsModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          reportPrice={selectedReport.price}
          reportTitle={selectedReport.title}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
      
      {/* Report Viewing Modal */}
      {isViewingReport && reportContent && (
        <div className="report-modal-overlay">
          <div className="report-modal">
            <div className="report-modal-header">
              <h2>Report Content</h2>
              <button className="close-button" onClick={closeReportView}>×</button>
            </div>
            <div className="report-modal-content">
              {reportContent.contentType === 'text/plain' ? (
                <div className="report-text-content">
                  <p>{reportContent.content}</p>
                </div>
              ) : (
                <div className="report-document-content">
                  <iframe
                    src={`data:${reportContent.contentType};base64,${btoa(reportContent.content)}`}
                    title="Report Document"
                    width="100%"
                    height="500px"
                  />
                </div>
              )}
            </div>
            <div className="report-modal-footer">
              <button className="close-report-btn" onClick={closeReportView}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsPage;