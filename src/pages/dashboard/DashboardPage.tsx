import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Dashboard.css';

// Mock data for dashboard
const mockAccountGrowth = [
  { month: 'Jan', value: 10 },
  { month: 'Feb', value: 15 },
  { month: 'Mar', value: 25 },
  { month: 'Apr', value: 30 },
  { month: 'May', value: 40 },
  { month: 'Jun', value: 55 },
  { month: 'Jul', value: 70 },
  { month: 'Aug', value: 85 },
  { month: 'Sep', value: 95 },
  { month: 'Oct', value: 110 },
  { month: 'Nov', value: 120 },
  { month: 'Dec', value: 135 },
];

const DashboardPage: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadProperty, setUploadProperty] = useState('');
  const [uploadType, setUploadType] = useState('inspection');
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
    }
  };
  
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadFile || !uploadProperty || !uploadType) {
      alert('Please fill in all fields');
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload and AI processing
    setTimeout(() => {
      console.log('Uploading report:', {
        file: uploadFile.name,
        property: uploadProperty,
        type: uploadType
      });
      
      // Simulate AI processing
      console.log('AI processing report...');
      console.log('Storing report on ETHStorage...');
      
      setIsUploading(false);
      setIsUploadModalOpen(false);
      setUploadFile(null);
      setUploadProperty('');
      setUploadType('inspection');
      
      alert('Report uploaded and processed successfully!');
    }, 2000);
  };
  
  // Function to render the growth trend line chart
  const renderGrowthChart = () => {
    const maxValue = Math.max(...mockAccountGrowth.map(item => item.value));
    const chartHeight = 200;
    const chartWidth = 800;
    const pointSpacing = chartWidth / (mockAccountGrowth.length - 1);
    
    // Generate points for the trend line
    const points = mockAccountGrowth.map((item, index) => {
      const x = index * pointSpacing;
      const y = chartHeight - (item.value / maxValue) * chartHeight;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <div className="growth-chart">
        <h3>Account Growth Trend</h3>
        <div className="chart-container">
          <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
            {/* Y-axis grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
              <line 
                key={i}
                x1="0" 
                y1={chartHeight * (1 - ratio)} 
                x2={chartWidth} 
                y2={chartHeight * (1 - ratio)}
                stroke="#e1e4e8" 
                strokeWidth="1"
              />
            ))}
            
            {/* Trend line */}
            <polyline
              fill="none"
              stroke="#4A90E2"
              strokeWidth="3"
              points={points}
            />
            
            {/* Data points */}
            {mockAccountGrowth.map((item, index) => (
              <circle
                key={index}
                cx={index * pointSpacing}
                cy={chartHeight - (item.value / maxValue) * chartHeight}
                r="5"
                fill="#4A90E2"
              />
            ))}
          </svg>
          
          {/* X-axis labels */}
          <div className="chart-labels">
            {mockAccountGrowth.map((item, index) => (
              <div key={index} className="chart-label" style={{ left: `${(index / (mockAccountGrowth.length - 1)) * 100}%` }}>
                {item.month}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="dashboard-page">
      <Header />
      
      <main className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="dashboard-actions">
            <Link to="/reports" className="dashboard-btn">View Reports</Link>
            <Link to="/activity" className="dashboard-btn">View Activity</Link>
            <button 
              className="upload-report-btn"
              onClick={() => setIsUploadModalOpen(true)}
            >
              Upload Report
            </button>
          </div>
        </div>
        
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Uploaded</h3>
            <div className="stat-value">8</div>
          </div>
          <div className="stat-card">
            <h3>Verified</h3>
            <div className="stat-value">12</div>
          </div>
          <div className="stat-card">
            <h3>Interested</h3>
            <div className="stat-value">15</div>
          </div>
          <div className="stat-card">
            <h3>Purchased</h3>
            <div className="stat-value">6</div>
          </div>
        </div>
        
        {renderGrowthChart()}
        
        <div className="dashboard-sections">
          <div className="dashboard-section">
            <h2>Recent Reports</h2>
            <div className="dashboard-section-content">
              <div className="report-preview-list">
                <div className="report-preview">
                  <div className="report-preview-header">
                    <h4>Home Inspection Report</h4>
                    <span className="report-type inspection">Inspection</span>
                  </div>
                  <p>123 Blockchain Street, Crypto City, CA</p>
                  <Link to="/reports" className="view-all-link">View All Reports</Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="dashboard-section">
            <h2>Recent Activity</h2>
            <div className="dashboard-section-content">
              <div className="activity-preview-list">
                <div className="activity-preview">
                  <div className="activity-icon purchase">💰</div>
                  <div className="activity-content">
                    <p>Purchased Home Inspection Report for 123 Blockchain Street</p>
                    <span className="activity-date">Feb 25, 2025</span>
                  </div>
                </div>
              </div>
              <Link to="/activity" className="view-all-link">View All Activity</Link>
            </div>
          </div>
        </div>
        
        {isUploadModalOpen && (
          <div className="modal-overlay">
            <div className="upload-modal">
              <div className="modal-header">
                <h2>Upload Report</h2>
                <button 
                  className="close-modal-btn"
                  onClick={() => setIsUploadModalOpen(false)}
                >
                  ✕
                </button>
              </div>
              
              <form className="upload-form" onSubmit={handleUploadSubmit}>
                <div className="form-group">
                  <label htmlFor="property">Property</label>
                  <select 
                    id="property"
                    value={uploadProperty}
                    onChange={(e) => setUploadProperty(e.target.value)}
                    required
                  >
                    <option value="">Select a property</option>
                    <option value="1">123 Blockchain Street, Crypto City, CA</option>
                    <option value="2">456 Ethereum Avenue, Blockchain Heights, NY</option>
                    <option value="3">789 Bitcoin Boulevard, DeFi District, TX</option>
                    <option value="4">101 NFT Lane, Metaverse City, CA</option>
                    <option value="5">202 Smart Contract Court, Token Town, WA</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="type">Report Type</label>
                  <select 
                    id="type"
                    value={uploadType}
                    onChange={(e) => setUploadType(e.target.value)}
                    required
                  >
                    <option value="inspection">Home Inspection</option>
                    <option value="title">Title History</option>
                    <option value="renovation">Renovation Records</option>
                    <option value="environmental">Environmental Assessment</option>
                    <option value="valuation">Property Valuation</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="file">Report File</label>
                  <input 
                    type="file" 
                    id="file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={handleFileChange}
                    required
                  />
                  <p className="file-help">
                    Supported formats: PDF, DOC, DOCX, JPG, PNG
                  </p>
                </div>
                
                <div className="upload-info">
                  <p>
                    <strong>AI Processing:</strong> Your report will be automatically processed by our AI to extract and standardize information.
                  </p>
                  <p>
                    <strong>Blockchain Storage:</strong> The report will be securely stored on ETHStorage with a verifiable link to the property.
                  </p>
                </div>
                
                <button 
                  type="submit" 
                  className="upload-submit-btn"
                  disabled={isUploading}
                >
                  {isUploading ? 'Processing...' : 'Upload & Process'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;