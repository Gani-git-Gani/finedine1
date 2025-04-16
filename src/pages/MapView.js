import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { hotels } from '../data/hotels';
import { savedMaps } from '../data/savedMaps';
import '../styles/MapView.css';

function MapView() {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    // Find the hotel by ID
    const selectedHotel = hotels.find(h => h.id === parseInt(hotelId));
    if (selectedHotel) {
      setHotel(selectedHotel);
      
      // Find the saved map for this hotel
      const hotelMap = savedMaps.find(m => m.hotelId === parseInt(hotelId));
      if (hotelMap) {
        setMapData(hotelMap);
      }
    }
  }, [hotelId]);

  const handleBack = () => {
    if (hotel) {
      // Navigate back to the hotel list for this location
      navigate(`/hotels/${hotel.location}`);
    } else {
      // Fallback to home if hotel data isn't available
      navigate('/');
    }
  };

  if (!hotel || !mapData) {
    return <div className="loading">Loading map...</div>;
  }

  const mapContainerStyle = {
    width: '100%',
    height: '100vh'
  };

  return (
    <div className="map-container">
      <div className="map-header">
        <button className="back-button" onClick={handleBack}>← Back</button>
        <h2>{hotel.name}</h2>
      </div>
      
      <LoadScript googleMapsApiKey="AIzaSyDilu38CbjGg3dMKqnWqAVHUz6DV4lEm9g">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapData.center}
          zoom={mapData.zoom}
        >
          <Marker position={mapData.center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MapView;
