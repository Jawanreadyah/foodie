import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import Navigation from '../components/Navigation';
import { X, ChevronLeft, ChevronRight, MapPin, Star, Clock } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import './MapDeals.css';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom restaurant pin icon
const createRestaurantIcon = (offers) => {
  return L.divIcon({
    className: 'custom-pin',
    html: `
      <div class="map-restaurant-pin">
        <span class="pin-offers">${offers}+</span>
      </div>
    `,
    iconSize: [40, 48],
    iconAnchor: [20, 48],
    popupAnchor: [0, -48],
  });
};

// Qatar restaurant locations with real Doha coordinates
const MAP_RESTAURANTS = [
  {
    id: 1,
    name: 'Burger Joint',
    location: 'The Pearl, Doha',
    lat: 25.3684,
    lng: 51.5510,
    rating: 4.8,
    offers: 3,
    deliveryTime: '35 mins',
    flyers: [
      { id: 1, image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&q=80&w=400', title: 'Weekend Special - Buy 1 Get 1 Free' },
      { id: 2, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400', title: 'Combo Deal - Burger + Fries + Drink' },
      { id: 3, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=400', title: 'Family Feast - 50% Off' },
    ]
  },
  {
    id: 2,
    name: 'Pizza Palace',
    location: 'Lusail City',
    lat: 25.4200,
    lng: 51.4900,
    rating: 4.6,
    offers: 2,
    deliveryTime: '40 mins',
    flyers: [
      { id: 1, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=400', title: '2 Large Pizzas for 99 QR' },
      { id: 2, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=400', title: 'Pepperoni Feast - BOGO' },
    ]
  },
  {
    id: 3,
    name: 'Sushi Master',
    location: 'West Bay, Doha',
    lat: 25.3236,
    lng: 51.5280,
    rating: 4.9,
    offers: 5,
    deliveryTime: '45 mins',
    flyers: [
      { id: 1, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400', title: 'All-You-Can-Eat Sushi Night' },
      { id: 2, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=400', title: 'Premium Sashimi Platter Deal' },
    ]
  },
  {
    id: 4,
    name: 'Café Mocha',
    location: 'Katara, Doha',
    lat: 25.3590,
    lng: 51.5270,
    rating: 4.5,
    offers: 1,
    deliveryTime: '25 mins',
    flyers: [
      { id: 1, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400', title: 'Happy Hour - 2 for 1 Coffees' },
    ]
  },
  {
    id: 5,
    name: 'Shawarma House',
    location: 'Souq Waqif',
    lat: 25.2867,
    lng: 51.5333,
    rating: 4.7,
    offers: 4,
    deliveryTime: '20 mins',
    flyers: [
      { id: 1, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=400', title: 'Shawarma Meal Deal - 25 QR' },
      { id: 2, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400', title: 'Late Night Special - Free Drink' },
      { id: 3, image: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?auto=format&fit=crop&q=80&w=400', title: 'Falafel Fridays - 30% Off' },
    ]
  },
  {
    id: 6,
    name: 'Al Shami Restaurant',
    location: 'Al Sadd, Doha',
    lat: 25.2740,
    lng: 51.5130,
    rating: 4.4,
    offers: 2,
    deliveryTime: '30 mins',
    flyers: [
      { id: 1, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400', title: 'Grilled Platter - 20% Off' },
      { id: 2, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=400', title: 'Family Dinner Package' },
    ]
  },
  {
    id: 7,
    name: 'Nando\'s Qatar',
    location: 'Villaggio Mall',
    lat: 25.2615,
    lng: 51.4387,
    rating: 4.3,
    offers: 3,
    deliveryTime: '35 mins',
    flyers: [
      { id: 1, image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80&w=400', title: 'Peri-Peri Chicken Deal' },
      { id: 2, image: 'https://images.unsplash.com/photo-1532768641073-503a250f9754?auto=format&fit=crop&q=80&w=400', title: 'Student Discount - 15% Off' },
    ]
  },
];

// Doha center coordinates
const DOHA_CENTER = [25.3200, 51.5100];

// Component to fly to marker on click
const FlyToMarker = ({ position }) => {
  const map = useMap();
  if (position) {
    map.flyTo(position, 14, { duration: 0.8 });
  }
  return null;
};

const MapDeals = () => {
  const navigate = useNavigate();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [currentFlyerIndex, setCurrentFlyerIndex] = useState(0);

  const handlePinClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentFlyerIndex(0);
  };

  const handleClose = () => {
    setSelectedRestaurant(null);
    setCurrentFlyerIndex(0);
  };

  const nextFlyer = () => {
    if (selectedRestaurant) {
      setCurrentFlyerIndex((prev) =>
        prev < selectedRestaurant.flyers.length - 1 ? prev + 1 : 0
      );
    }
  };

  const prevFlyer = () => {
    if (selectedRestaurant) {
      setCurrentFlyerIndex((prev) =>
        prev > 0 ? prev - 1 : selectedRestaurant.flyers.length - 1
      );
    }
  };

  return (
    <div className="map-page">
      {/* Map Header */}
      <div className="map-top-bar">
        <button className="map-back-btn" onClick={() => navigate('/')}>
          <ChevronLeft size={20} />
        </button>
        <h2 className="map-title">Deals Map</h2>
        <div className="map-restaurant-count">{MAP_RESTAURANTS.length} places</div>
      </div>

      {/* Leaflet Map */}
      <div className="map-wrapper">
        <MapContainer
          center={DOHA_CENTER}
          zoom={12}
          className="leaflet-map"
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap'
          />

          {selectedRestaurant && (
            <FlyToMarker position={[selectedRestaurant.lat, selectedRestaurant.lng]} />
          )}

          {MAP_RESTAURANTS.map((restaurant) => (
            <Marker
              key={restaurant.id}
              position={[restaurant.lat, restaurant.lng]}
              icon={createRestaurantIcon(restaurant.offers)}
              eventHandlers={{
                click: () => handlePinClick(restaurant),
              }}
            />
          ))}
        </MapContainer>
      </div>

      {/* ─── Slideable Offer Popup Panel ─── */}
      {selectedRestaurant && (
        <div className={`offer-panel ${selectedRestaurant ? 'open' : ''}`}>
          <div className="offer-panel-header">
            <div className="offer-panel-info">
              <h3 className="offer-panel-name">{selectedRestaurant.name}</h3>
              <div className="offer-panel-meta">
                <span className="offer-panel-location">
                  <MapPin size={12} /> {selectedRestaurant.location}
                </span>
                <span className="offer-panel-rating">
                  <Star size={12} fill="#f59e0b" color="#f59e0b" /> {selectedRestaurant.rating}
                </span>
                <span className="offer-panel-time">
                  <Clock size={12} /> {selectedRestaurant.deliveryTime}
                </span>
              </div>
            </div>
            <button className="offer-panel-close" onClick={handleClose}>
              <X size={18} />
            </button>
          </div>

          {/* Flyer Carousel */}
          <div className="offer-panel-carousel">
            <button className="carousel-nav-btn prev" onClick={prevFlyer}>
              <ChevronLeft size={20} />
            </button>

            <div className="offer-panel-flyer">
              <img
                src={selectedRestaurant.flyers[currentFlyerIndex].image}
                alt={selectedRestaurant.flyers[currentFlyerIndex].title}
              />
              <div className="flyer-caption">
                <p>{selectedRestaurant.flyers[currentFlyerIndex].title}</p>
                <span className="flyer-counter">
                  {currentFlyerIndex + 1} / {selectedRestaurant.flyers.length}
                </span>
              </div>
            </div>

            <button className="carousel-nav-btn next" onClick={nextFlyer}>
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
          <div className="offer-panel-dots">
            {selectedRestaurant.flyers.map((_, i) => (
              <span
                key={i}
                className={`panel-dot ${i === currentFlyerIndex ? 'active' : ''}`}
                onClick={() => setCurrentFlyerIndex(i)}
              />
            ))}
          </div>

          <button
            className="offer-panel-view-btn"
            onClick={() => navigate(`/restaurant/${selectedRestaurant.id}`)}
          >
            View All Offers
          </button>
        </div>
      )}

      <Navigation />
    </div>
  );
};

export default MapDeals;
