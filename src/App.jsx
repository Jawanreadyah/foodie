import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import MapDeals from './pages/MapDeals';
import RestaurantDetails from './pages/RestaurantDetails';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/map" element={<MapDeals />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
