import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import apiService, { Property } from '../services/api';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const currentYear = new Date().getFullYear();
  const propertyAge = currentYear - property.yearBuilt;
  
  return (
    <div className="property-card">
      <div className="property-image-container">
        <img src={property.imageUrl} alt={property.address} className="property-image" />
        {property.isVerified && (
          <div className="property-verified-badge">
            <span className="verified-icon">✓</span> Verified
          </div>
        )}
      </div>
      <div className="property-details">
        <h3 className="property-address">{property.address}</h3>
        <p className="property-location">{property.city}, {property.state} {property.zipCode}</p>
        <div className="property-stats">
          <div className="property-stat">
            <span className="stat-value">{propertyAge}</span>
            <span className="stat-label">Years Old</span>
          </div>
          <div className="property-stat">
            <span className="stat-value">{property.totalReports}</span>
            <span className="stat-label">Reports</span>
          </div>
          <div className="property-stat">
            <span className="stat-value">${(property.price / 1000).toFixed(0)}k</span>
            <span className="stat-label">Price</span>
          </div>
        </div>
        <div className="property-features">
          <span className="property-feature">{property.bedrooms} Beds</span>
          <span className="property-feature">{property.bathrooms} Baths</span>
          <span className="property-feature">{property.squareFeet.toLocaleString()} Sq Ft</span>
        </div>
        <Link to={`/properties/${property.id}`} className="view-property-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

const PropertiesPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('');
  
  useEffect(() => {
    // Fetch properties using the API service
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await apiService.properties.getAll({
          search: searchTerm,
          state: filterState
        });
        
        setProperties(response.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, [searchTerm, filterState]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleStateFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterState(e.target.value);
  };
  
  // Get unique states for filter dropdown
  const uniqueStates = Array.from(new Set(properties.map(property => property.state))).sort();
  
  return (
    <div className="properties-page">
      <Header />
      
      <main className="properties-container">
        <div className="properties-header">
          <h1>Properties</h1>
          <p>Browse verified property records on the blockchain</p>
        </div>
        
        <div className="properties-filters">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by address, city, or zip code"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          
          <div className="filter-container">
            <select
              value={filterState}
              onChange={handleStateFilterChange}
              className="state-filter"
            >
              <option value="">All States</option>
              {uniqueStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="no-results">
            <p>No properties found matching your criteria.</p>
          </div>
        ) : (
          <div className="properties-grid">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertiesPage;