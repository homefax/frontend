import React, { useEffect, useRef, useState } from 'react';

// Define the props interface
interface AddressAutocompleteProps {
  value: string;
  onChange: (address: string) => void;
  placeholder?: string;
  required?: boolean;
  id?: string;
  className?: string;
}

// Define possible API states
type ApiStatus = 'idle' | 'loading' | 'error' | 'no-results';

// Define the Google Maps API window interface
declare global {
  interface Window {
    google: any;
    initGoogleMapsAutocomplete: () => void;
  }
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  value,
  onChange,
  placeholder = 'Enter an address',
  required = false,
  id = 'address-autocomplete',
  className = '',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isScriptLoading, setIsScriptLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<ApiStatus>('idle');
  const [hasResults, setHasResults] = useState(true);

  // Function to initialize the Google Maps Places Autocomplete
  const initAutocomplete = () => {
    if (!inputRef.current || !window.google) {
      setApiStatus('error');
      return;
    }

    try {
      // Create the autocomplete object
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'us' }, // Restrict to US addresses
        fields: ['formatted_address'],
      });

      // Add listener for place selection
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace();
        if (place && place.formatted_address) {
          onChange(place.formatted_address);
          setHasResults(true);
        } else {
          // No results found, but user can still use the manually entered text
          setHasResults(false);
        }
      });

      // Add listener for predictions_changed event (if available)
      if (window.google.maps.places.PlacesServiceStatus) {
        // This is a workaround since there's no direct event for "no predictions"
        setApiStatus('idle');
      }
    } catch (error) {
      console.error('Error initializing Google Places Autocomplete:', error);
      setApiStatus('error');
    }
  };

  // Load the Google Maps API script
  useEffect(() => {
    // Skip if script is already loaded or loading
    if (isScriptLoaded || isScriptLoading) return;

    // Set up the callback function
    window.initGoogleMapsAutocomplete = () => {
      setIsScriptLoaded(true);
      setApiStatus('idle');
      initAutocomplete();
    };

    // Create and append the script tag
    const script = document.createElement('script');
    // TODO: Replace 'YOUR_GOOGLE_MAPS_API_KEY' with a valid Google Maps API key with Places API enabled
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places&callback=initGoogleMapsAutocomplete`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      console.error('Google Maps API failed to load');
      setApiStatus('error');
      setIsScriptLoading(false);
    };

    // Set loading state and append script
    setIsScriptLoading(true);
    document.head.appendChild(script);

    // Cleanup
    return () => {
      // Remove the callback function
      if (window.initGoogleMapsAutocomplete) {
        window.initGoogleMapsAutocomplete = () => {};
      }
      // Remove the script tag if it exists
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Initialize autocomplete when script is loaded
  useEffect(() => {
    if (isScriptLoaded && !autocompleteRef.current) {
      initAutocomplete();
    }
  }, [isScriptLoaded]);

  // Handle manual input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
    
    // If user is typing, they're likely entering manually
    if (value.length > 0 && apiStatus === 'error') {
      // Keep the error status but allow manual entry
      setHasResults(true);
    } else if (value.length === 0) {
      // Reset states when input is cleared
      setHasResults(true);
      if (apiStatus === 'no-results') {
        setApiStatus('idle');
      }
    }
  };

  return (
    <div className="address-autocomplete-container">
      <input
        ref={inputRef}
        type="text"
        id={id}
        className={`address-autocomplete-input ${className}`}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
      />
      {isScriptLoading && !isScriptLoaded && (
        <div className="autocomplete-loading">Loading address suggestions...</div>
      )}
      
      {/* Show appropriate messages based on API status */}
      {apiStatus === 'error' && (
        <div className="address-manual-entry-notice">
          Address suggestions unavailable. Please enter address manually.
        </div>
      )}
      
      {!hasResults && value.length > 0 && (
        <div className="address-manual-entry-notice">
          No suggestions found. You can continue typing your address manually.
        </div>
      )}
    </div>
  );
};

export default AddressAutocomplete;