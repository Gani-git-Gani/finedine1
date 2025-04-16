import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hotels } from '../data/hotels';
import LocationButtons from './LocationButtons';
import '../styles/SearchBar.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = hotels.filter(hotel => 
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredHotels(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setFilteredHotels([]);
      setShowDropdown(false);
    }
  }, [searchTerm]);

  const handleHotelSelect = (hotelId) => {
    setShowDropdown(false);
    setSearchTerm('');
    navigate(`/map/${hotelId}`);
  };

  return (
    <div className="search-container" ref={wrapperRef}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter Destination"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setShowDropdown(filteredHotels.length > 0)}
        />
      </div>
      
      <LocationButtons />
      
      {showDropdown && (
        <div className="dropdown">
          {filteredHotels.map((hotel) => (
            <div 
              key={hotel.id} 
              className="dropdown-item"
              onClick={() => handleHotelSelect(hotel.id)}
            >
              {hotel.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;