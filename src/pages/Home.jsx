import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import Navigation from '../components/Navigation';
import { Bell, MapPin, ChevronRight, Search, Menu, ChevronDown, User } from 'lucide-react';
import './Home.css';

// Carousel banner images
const BANNER_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200',
    alt: 'Delicious food spread'
  },
  {
    url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1200',
    alt: 'Fine dining experience'
  },
  {
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
    alt: 'Restaurant ambiance'
  },
  {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200',
    alt: 'Cozy restaurant interior'
  }
];

// Mock restaurants with offers
const MOCK_RESTAURANTS = [
  {
    id: 1,
    name: 'Burger Joint',
    location: 'The Pearl, Doha',
    offers: 3,
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Pizza Palace',
    location: 'Lusail City',
    offers: 2,
    image_url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=400',
    rating: 4.6
  },
  {
    id: 3,
    name: 'Sushi Master',
    location: 'West Bay, Doha',
    offers: 5,
    image_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400',
    rating: 4.9
  },
  {
    id: 4,
    name: 'Café Mocha',
    location: 'Katara, Doha',
    offers: 1,
    image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400',
    rating: 4.5
  },
  {
    id: 5,
    name: 'Shawarma House',
    location: 'Souq Waqif',
    offers: 4,
    image_url: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=400',
    rating: 4.7
  }
];

// Popular restaurants with logos
const POPULAR_RESTAURANTS = [
  {
    id: 1,
    name: 'McDonald\'s',
    logo: 'https://images.unsplash.com/photo-1619454016518-697bc231e7cb?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 2,
    name: 'KFC',
    logo: 'https://images.unsplash.com/photo-1513639776629-7b43c2bfa135?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 3,
    name: 'Pizza Hut',
    logo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 4,
    name: 'Starbucks',
    logo: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 5,
    name: 'Subway',
    logo: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 6,
    name: 'Hardee\'s',
    logo: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=200'
  }
];

const Home = () => {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);
  const userLocation = "Doha, Qatar";

  // Auto-rotate banner every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNER_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      {/* ─── Desktop Top Navbar (Snoonu-style) ─── */}
      <header className="desktop-navbar">
        <div className="navbar-top">
          <div className="navbar-left">
            <h1 className="brand-logo">Foodie<span>Qatar</span></h1>
            <button className="catalog-btn">
              <Menu size={18} />
              Catalog
            </button>
            <button className="location-dropdown">
              Everywhere <ChevronDown size={14} />
            </button>
          </div>
          <div className="navbar-search">
            <input type="text" placeholder="Search for stores and restaurants" />
            <button className="search-submit-btn">
              <Search size={18} />
            </button>
          </div>
          <button className="login-btn" onClick={() => navigate('/auth')}>
            <User size={16} />
            Login
          </button>
        </div>
        <div className="navbar-bottom-row">
          <div className="navbar-location">
            <span className="lang-toggle">عربي</span>
            <div className="nav-location-pin">
              <MapPin size={14} />
              <span>{userLocation}</span>
            </div>
          </div>
          <nav className="navbar-links">
            <a href="#" className="nav-link-item">Market</a>
            <a href="#" className="nav-link-item">Restaurants</a>
            <a href="#" className="nav-link-item">Grocery</a>
            <a href="#" className="nav-link-item" onClick={(e) => { e.preventDefault(); navigate('/map'); }}>Map Deals</a>
          </nav>
        </div>
      </header>

      {/* ─── Mobile Header ─── */}
      <header className="mobile-header">
        <div className="user-profile">
          <div className="user-avatar">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" alt="User" />
          </div>
          <div className="location-info">
            <p className="user-name">Esther Howard</p>
            <div className="location-value">
              <MapPin size={14} className="location-icon" />
              <span>{userLocation}</span>
            </div>
          </div>
        </div>
        <button className="notification-btn glass-card">
          <Bell size={20} />
          <span className="badge"></span>
        </button>
      </header>

      <div className="home-container animate-slide-up">
        <main className="home-content">
          {/* Mobile-only FilterBar */}
          <div className="mobile-filter-section">
            <FilterBar />
          </div>

          {/* Auto-rotating Banner Carousel */}
          <div className="carousel-container">
            <div className="carousel-track">
              {BANNER_IMAGES.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-slide ${index === currentBanner ? 'active' : ''}`}
                >
                  <img src={image.url} alt={image.alt} className="carousel-image" />
                </div>
              ))}
            </div>
            <div className="carousel-dots">
              {BANNER_IMAGES.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentBanner ? 'active' : ''}`}
                  onClick={() => setCurrentBanner(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Restaurant Cards with Offers */}
          <div className="restaurants-section">
            <div className="section-header">
              <h3>Restaurants Near You</h3>
              <button className="view-all">View all <ChevronRight size={16} /></button>
            </div>
            <div className="restaurant-cards-scroll">
              {MOCK_RESTAURANTS.map((restaurant) => (
                <div key={restaurant.id} className="restaurant-card" onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
                  <div className="restaurant-card-image">
                    <img src={restaurant.image_url} alt={restaurant.name} />
                    {restaurant.offers > 0 && (
                      <span className="offer-pill">{restaurant.offers}+ offers</span>
                    )}
                  </div>
                  <div className="restaurant-card-info">
                    <p className="restaurant-card-name">{restaurant.name}</p>
                    <div className="restaurant-card-location">
                      <MapPin size={12} />
                      <span>{restaurant.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Restaurants */}
          <div className="popular-section">
            <div className="section-header">
              <h3>Popular Restaurants</h3>
              <button className="view-all">View all <ChevronRight size={16} /></button>
            </div>
            <div className="popular-restaurants-grid">
              {POPULAR_RESTAURANTS.map((restaurant) => (
                <div key={restaurant.id} className="popular-restaurant-item">
                  <div className="popular-restaurant-logo">
                    <img src={restaurant.logo} alt={restaurant.name} />
                  </div>
                  <span className="popular-restaurant-name">{restaurant.name}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* ─── 3D Tilted Ad Frame (Desktop Only) ─── */}
      <div className="tilted-ad-frame">
        <div className="tilted-ad-inner">
          <img src="/ad-banner.png" alt="FoodieQatar Promotion" />
          <div className="ad-badge">AD</div>
        </div>
        <div className="tilted-ad-shadow"></div>
      </div>

      <Navigation />
    </div>
  );
};

export default Home;
