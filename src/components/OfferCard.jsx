import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Star, ExternalLink } from 'lucide-react';
import './OfferCard.css';

const OfferCard = ({ offer }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/restaurant/${offer.id}`);
  };

  return (
    <div className="offer-card" onClick={handleCardClick}>
      <div className="offer-image-container">
        <img src={offer.image_url} alt={offer.title} className="offer-image" />
      </div>
      
      <div className="offer-content">
        <p className="offer-title">{offer.restaurant.name}</p>
        <p className="offer-location">{offer.distance} km away</p>
      </div>
    </div>
  );
};

export default OfferCard;
