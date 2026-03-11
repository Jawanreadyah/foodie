import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home as HomeIcon, Map as MapIcon, Heart, User } from 'lucide-react';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="bottom-nav glass-panel">
      <div className="nav-items-container">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <HomeIcon className="nav-icon" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/map" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <MapIcon className="nav-icon" />
          <span>Map</span>
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Heart className="nav-icon" />
          <span>Saved</span>
        </NavLink>
        <NavLink to="/auth" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <User className="nav-icon" />
          <span>Account</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
