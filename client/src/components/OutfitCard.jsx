import React from 'react';
import './OutfitCard.css';

const OutfitCard = ({ outfit }) => {
  return (
    <div className="outfit-card">
      <div className="outfit-image-container">
        <img src={outfit.imageUrl} alt={outfit.name} className="outfit-image" />
        <span className="category-tag">{outfit.category}</span>
      </div>
      
      <div className="outfit-content">
        <h3>{outfit.name}</h3>
        <p className="outfit-desc">{outfit.description}</p>
        
        <div className="outfit-items">
          <h4>Wear this:</h4>
          <ul>
            {outfit.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;