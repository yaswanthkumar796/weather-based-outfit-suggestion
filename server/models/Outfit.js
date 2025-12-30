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
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Unisex'],
    default: 'Unisex',
    required: true
  },
  // COLOR PSYCHOLOGY FEATURE
  colors: {
    type: [String],
    enum: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple',
      'Pink', 'Brown', 'Black', 'White', 'Gray', 'Beige',
      'Navy', 'Burgundy', 'Olive', 'Tan', 'Cream', 'Mint'],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Outfit', OutfitSchema);