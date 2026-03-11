import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, MapPin, Search, ChevronDown, ChevronRight, Star, Clock } from 'lucide-react';
import './RestaurantDetails.css';

// Mock restaurant data with offer flyers
const RESTAURANTS_DATA = {
  1: {
    name: 'Burger Joint',
    rating: 4.8,
    deliveryTime: '35 mins',
    priceRange: '$$$',
    workingHours: 'Until Tomorrow 3:45 AM',
    isOpen: true,
    address: 'The Pearl, Doha',
    promoTag: '50% Off on Selected Items',
    breadcrumbs: ['Home Page', 'Restaurants', 'Burger Joint'],
    flyers: [
      { id: 1, image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&q=80&w=600&h=800', title: 'Weekend Special - Buy 1 Get 1 Free' },
      { id: 2, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600&h=800', title: 'Combo Deal - Burger + Fries + Drink' },
      { id: 3, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600&h=800', title: 'Family Feast - 50% Off' },
      { id: 4, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=600&h=800', title: 'Free Fries Friday' },
    ]
  },
  2: {
    name: 'Pizza Palace',
    rating: 4.6,
    deliveryTime: '40 mins',
    priceRange: '$$',
    workingHours: 'Until 11:30 PM',
    isOpen: true,
    address: 'Lusail City',
    promoTag: 'Buy 1 Get 1 Free',
    breadcrumbs: ['Home Page', 'Restaurants', 'Pizza Palace'],
    flyers: [
      { id: 1, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=600&h=800', title: '2 Large Pizzas for 99 QR' },
      { id: 2, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600&h=800', title: 'Pepperoni Feast - BOGO' },
      { id: 3, image: 'https://images.unsplash.com/photo-1619531040576-f9416740661b?auto=format&fit=crop&q=80&w=600&h=800', title: 'Midweek Madness - 40% Off' },
    ]
  },
  3: {
    name: 'Sushi Master',
    rating: 4.9,
    deliveryTime: '45 mins',
    priceRange: '$$$$',
    workingHours: 'Until 10:00 PM',
    isOpen: true,
    address: 'West Bay, Doha',
    promoTag: '30% Off All Rolls',
    breadcrumbs: ['Home Page', 'Restaurants', 'Sushi Master'],
    flyers: [
      { id: 1, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600&h=800', title: 'All-You-Can-Eat Sushi Night' },
      { id: 2, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=600&h=800', title: 'Premium Sashimi Platter Deal' },
    ]
  },
  4: {
    name: 'Café Mocha',
    rating: 4.5,
    deliveryTime: '25 mins',
    priceRange: '$$',
    workingHours: 'Until 12:00 AM',
    isOpen: true,
    address: 'Katara, Doha',
    promoTag: 'Free Dessert with Any Coffee',
    breadcrumbs: ['Home Page', 'Restaurants', 'Café Mocha'],
    flyers: [
      { id: 1, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600&h=800', title: 'Happy Hour - 2 for 1 Coffees' },
      { id: 2, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?auto=format&fit=crop&q=80&w=600&h=800', title: 'Morning Pastry Bundle' },
    ]
  },
  5: {
    name: 'Shawarma House',
    rating: 4.7,
    deliveryTime: '20 mins',
    priceRange: '$',
    workingHours: 'Until 2:00 AM',
    isOpen: true,
    address: 'Souq Waqif',
    promoTag: '20% Off on All Wraps',
    breadcrumbs: ['Home Page', 'Restaurants', 'Shawarma House'],
    flyers: [
      { id: 1, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=600&h=800', title: 'Shawarma Meal Deal - 25 QR' },
      { id: 2, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600&h=800', title: 'Late Night Special - Free Drink' },
      { id: 3, image: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?auto=format&fit=crop&q=80&w=600&h=800', title: 'Falafel Fridays - 30% Off' },
    ]
  }
};

const DEFAULT_RESTAURANT = RESTAURANTS_DATA[1];

const RestaurantDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedFlyer, setSelectedFlyer] = useState(null);

  const restaurant = RESTAURANTS_DATA[id] || DEFAULT_RESTAURANT;

  return (
    <div className="rd-page">
      {/* ─── Desktop Navbar ─── */}
      <header className="rd-navbar">
        <div className="rd-navbar-top">
          <h1 className="rd-brand" onClick={() => navigate('/')}>Foodie<span>Qatar</span></h1>
          <div className="rd-navbar-search">
            <input type="text" placeholder="Search for stores and restaurants" />
            <button className="rd-search-btn"><Search size={18} /></button>
          </div>
          <button className="rd-login-btn" onClick={() => navigate('/auth')}>Login</button>
        </div>
        <div className="rd-navbar-bottom">
          <div className="rd-nav-location">
            <span className="rd-lang">عربي</span>
            <div className="rd-location-pin">
              <MapPin size={14} />
              <span>{restaurant.address}</span>
            </div>
          </div>
          <nav className="rd-nav-links">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Market</a>
            <a href="#" className="active-link">Restaurants</a>
            <a href="#">Grocery</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/map'); }}>Map Deals</a>
          </nav>
        </div>
      </header>

      {/* ─── Mobile Back Bar ─── */}
      <div className="rd-mobile-bar">
        <button className="rd-back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={22} />
        </button>
        <span className="rd-mobile-title">{restaurant.name}</span>
        <div style={{ width: 40 }}></div>
      </div>

      {/* ─── Content ─── */}
      <div className="rd-content">
        {/* Breadcrumbs (desktop) */}
        <div className="rd-breadcrumbs">
          {restaurant.breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              <span
                className={`rd-crumb ${i === restaurant.breadcrumbs.length - 1 ? 'current' : 'link'}`}
                onClick={() => i === 0 && navigate('/')}
              >
                {crumb}
              </span>
              {i < restaurant.breadcrumbs.length - 1 && <ChevronRight size={14} className="rd-crumb-sep" />}
            </React.Fragment>
          ))}
        </div>

        {/* Promo Tag */}
        <div className="rd-promo-tag">{restaurant.promoTag}</div>

        {/* Restaurant Name */}
        <h2 className="rd-restaurant-name">{restaurant.name}</h2>

        {/* Info Bar */}
        <div className="rd-info-bar">
          <div className="rd-info-item">
            <span className="rd-info-label">Delivery time</span>
            <span className="rd-info-value">{restaurant.deliveryTime}</span>
          </div>
          <div className="rd-info-divider"></div>
          <div className="rd-info-item">
            <span className="rd-info-label">Rating</span>
            <span className="rd-info-value">
              <Star size={14} fill="#f59e0b" color="#f59e0b" /> {restaurant.rating}
            </span>
          </div>
          <div className="rd-info-divider"></div>
          <div className="rd-info-item">
            <span className="rd-info-label">Price range</span>
            <span className="rd-info-value">{restaurant.priceRange}</span>
          </div>
          <div className="rd-info-divider"></div>
          <div className="rd-info-item">
            <span className="rd-info-label">Working hours</span>
            <span className="rd-info-value">
              <span className="rd-open-badge">Open</span> {restaurant.workingHours}
            </span>
          </div>
          <button className="rd-show-more">Show more <ChevronDown size={14} /></button>
        </div>

        {/* ─── Offer Flyers Gallery ─── */}
        <div className="rd-flyers-section">
          <h3 className="rd-flyers-title">
            <span className="rd-flyers-count">{restaurant.flyers.length}</span>
            Current Offers
          </h3>
          <div className="rd-flyers-grid">
            {restaurant.flyers.map((flyer) => (
              <div
                key={flyer.id}
                className="rd-flyer-card"
                onClick={() => setSelectedFlyer(flyer)}
              >
                <div className="rd-flyer-image">
                  <img src={flyer.image} alt={flyer.title} />
                  <div className="rd-flyer-overlay">
                    <span className="rd-flyer-view">View Offer</span>
                  </div>
                </div>
                <p className="rd-flyer-title">{flyer.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Flyer Lightbox ─── */}
      {selectedFlyer && (
        <div className="rd-lightbox" onClick={() => setSelectedFlyer(null)}>
          <div className="rd-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="rd-lightbox-close" onClick={() => setSelectedFlyer(null)}>✕</button>
            <img src={selectedFlyer.image} alt={selectedFlyer.title} className="rd-lightbox-image" />
            <div className="rd-lightbox-info">
              <h3>{selectedFlyer.title}</h3>
              <p>{restaurant.name} • {restaurant.address}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;
