import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import OfferCard from '../components/OfferCard';
import './Favorites.css';

const MOCK_FAVS = [
  {
    id: 1,
    title: '50% off on signature half-pound burgers',
    discount_percent: 50,
    valid_until: '10 PM',
    distance: 0.5,
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    restaurant: {
      name: 'Burger Joint',
      rating: 4.8,
      cuisine: 'Burgers'
    }
  }
];

const Favorites = () => {
  const [activeTab, setActiveTab] = useState('deals');

  return (
    <div className="favorites-page animate-slide-up">
      <header className="favorites-header">
        <h1>Saved</h1>
      </header>

      <div className="fav-tabs">
        <button 
          className={`fav-tab ${activeTab === 'deals' ? 'active' : ''}`}
          onClick={() => setActiveTab('deals')}
        >
          Saved Deals
        </button>
        <button 
          className={`fav-tab ${activeTab === 'restaurants' ? 'active' : ''}`}
          onClick={() => setActiveTab('restaurants')}
        >
          Favorite Places
        </button>
      </div>

      <main className="favorites-content">
        {activeTab === 'deals' ? (
          <div className="cards-container">
            {MOCK_FAVS.map(offer => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        ) : (
          <div className="no-favs glass-panel">
            <p>You haven't saved any restaurants yet.</p>
          </div>
        )}
      </main>
      
      <Navigation />
    </div>
  );
};

export default Favorites;
