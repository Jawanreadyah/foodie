import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { PlusCircle, TrendingUp, Users, Tag } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Mock Stats
  const MOCK_STATS = [
    { label: 'Active Offers', value: '3', icon: <Tag /> },
    { label: 'Total Claims', value: '142', icon: <Users /> },
    { label: 'Revenue Generated', value: '4,500 QAR', icon: <TrendingUp /> }
  ];

  const MOCK_ACTIVE_OFFERS = [
    { title: '50% off on signature half-pound burgers', claimed: 45, expiry: 'Today, 10 PM' },
    { title: 'Free Drink with any Combo', claimed: 97, expiry: 'Tomorrow, 11 PM' }
  ];

  return (
    <div className="dashboard-page animate-slide-up">
      <header className="dashboard-header glass-panel">
        <h1>Business Dashboard</h1>
        <p>Burger Joint</p>
      </header>
      
      <main className="dashboard-content">
        <div className="stats-grid">
          {MOCK_STATS.map((stat, i) => (
            <div key={i} className="stat-card glass-panel">
              <div className="stat-icon-wrapper">{stat.icon}</div>
              <div className="stat-details">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="section-header">
          <h2>Active Offers</h2>
          <button className="btn-primary flex-btn" onClick={() => setShowCreateModal(true)}>
            <PlusCircle size={18} /> New Offer
          </button>
        </div>

        <div className="active-offers-list">
          {MOCK_ACTIVE_OFFERS.map((offer, i) => (
            <div key={i} className="dashboard-offer-card glass-panel">
              <div className="offer-header">
                <h3>{offer.title}</h3>
                <span className="status-badge active">Active</span>
              </div>
              <div className="offer-stats">
                <p><strong>{offer.claimed}</strong> claims</p>
                <p>Expires: {offer.expiry}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Create Offer Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content glass-card animate-slide-up" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Create New Offer</h2>
            <form className="create-offer-form" onSubmit={(e) => { e.preventDefault(); setShowCreateModal(false); }}>
              <div className="form-group">
                <label>Offer Title</label>
                <input type="text" className="input-glass" placeholder="e.g. 50% OFF All Pizzas" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Discount %</label>
                  <input type="number" className="input-glass" placeholder="50" required />
                </div>
                <div className="form-group">
                  <label>Expiry Time</label>
                  <input type="time" className="input-glass" required />
                </div>
              </div>
              <div className="form-group">
                <label>Conditions</label>
                <textarea className="input-glass" rows="3" placeholder="Enter terms and conditions..."></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Publish Offer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Navigation />
    </div>
  );
};

export default Dashboard;
