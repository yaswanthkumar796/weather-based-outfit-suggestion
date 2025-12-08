const mongoose = require('mongoose');
const OutfitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  // KEY FIELDS FOR FILTERING LOGIC
  weatherCondition: { 
    type: [String], // e.g., ['Sunny', 'Clear']
    required: true
  },
  tempMin: {
    type: Number, // Minimum safe temperature for this outfit
    required: true
  },
  tempMax: {
    type: Number, // Maximum safe temperature for this outfit
    required: true
  },
  season: {
    type: [String], // e.g., ['Summer', 'Spring']
    required: true
  },
  // OUTFIT ITEMS
  items: {
    type: [String], // List of items: ['Light T-Shirt', 'Shorts', 'Sneakers']
    required: true
  },
  imageUrl: {
    type: String, // Link to the outfit image
    required: true
  },
  category: {
    type: String, // e.g., 'Formal', 'Casual', 'Sporty'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Outfit', OutfitSchema);