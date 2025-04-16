import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LocationButtons.css';

function LocationButtons() {
  const navigate = useNavigate();

  const locations = [
    { name: 'Goa', color: '#4285F4' },
    { name: 'Wayanad', color: '#34A853' },
    { name: 'Munnar', color: '#FBBC05' }
  ];

  const handleLocationSelect = (location) => {
    navigate(`/hotels/${location.toLowerCase()}`);
  };

  return (
    <div className="location-buttons">
      {locations.map((location, index) => (
        <button 
          key={index}
          className="location-button"
          style={{ backgroundColor: location.color }}
          onClick={() => handleLocationSelect(location.name)}
        >
          {location.name}
        </button>
      ))}
    </div>
  );
}

export default LocationButtons;