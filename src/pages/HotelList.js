import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { hotels } from '../data/hotels';
import '../styles/HotelList.css';

function HotelList() {
  const { location } = useParams();
  const navigate = useNavigate();
  const [locationHotels, setLocationHotels] = useState([]);

  useEffect(() => {
    // Filter hotels by location
    const filteredHotels = hotels.filter(
      hotel => hotel.location.toLowerCase() === location.toLowerCase()
    );
    setLocationHotels(filteredHotels);
  }, [location]);

  const handleHotelSelect = (hotelId) => {
    navigate(`/map/${hotelId}`);
  };

  return (
    <div className="hotel-list-container">
      <div className="hotel-list-header">
        <button className="back-button" onClick={() => navigate('/')}>← Back</button>
        <h2>Hotels nearby {location.charAt(0).toUpperCase() + location.slice(1)}</h2>
      </div>
      
      <div className="hotel-list">
        {locationHotels.length > 0 ? (
          locationHotels.map(hotel => (
            <div 
              key={hotel.id} 
              className="hotel-card"
              onClick={() => handleHotelSelect(hotel.id)}
            >
              <div className="hotel-image-placeholder"></div>
              <div className="hotel-info">
                <h3>{hotel.name}</h3>
                <p>{hotel.description}</p>
                <div className="hotel-rating">
                  {"⭐".repeat(hotel.rating)}
                  <span className="hotel-price">{"₹".repeat(hotel.priceLevel)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-hotels">
            <p>No hotels found in {location}.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HotelList;