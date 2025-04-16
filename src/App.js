import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import CategoryIcons from './components/CategoryIcons';
import MapView from './pages/MapView';
import HotelList from './pages/HotelList';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="app">
            <div className="header">
              <h1>FINE DINE</h1>
            </div>
            <div className="content">
              <SearchBar />
              <CategoryIcons />
            </div>
          </div>
        } />
        <Route path="/map/:hotelId" element={<MapView />} />
        <Route path="/hotels/:location" element={<HotelList />} />
      </Routes>
    </Router>
  );
}

export default App;