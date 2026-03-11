import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import './FilterBar.css';

const CATEGORIES = [
  { name: 'Breakfast', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=100&h=100&fit=crop' },
  { name: 'Coffee', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=100&h=100&fit=crop' },
  { name: 'Pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop' },
  { name: 'Grocery', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop' },
  { name: 'Fast food', image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=100&h=100&fit=crop' },
  { name: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=100&h=100&fit=crop' }
];

const FilterBar = ({ onSearch, onFilterChange }) => {
  return (
    <div className="filter-container">
      <div className="search-bar-wrapper">
        <div className="search-input-container">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            className="input-glass search-input" 
            placeholder="Search restaurants, items..."
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        </div>
        <button className="filter-button">
          <SlidersHorizontal size={20} />
        </button>
      </div>
      
      {/* Text Tabs Example (Optional, mimicking reference UI) */}
      <div className="filter-tabs">
        <span className="tab-item active">All</span>
        <span className="tab-item">Grocery</span>
        <span className="tab-item">Convenience</span>
        <span className="tab-item">Alcohol</span>
      </div>

      <div className="categories-scroll">
        {CATEGORIES.map(category => (
          <div key={category.name} className="circular-category" onClick={() => onFilterChange && onFilterChange({ cuisine: category.name })}>
            <div className="category-image-wrapper">
              <img src={category.image} alt={category.name} />
            </div>
            <span>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
