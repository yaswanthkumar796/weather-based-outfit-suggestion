const mongoose = require('mongoose');
const OutfitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  

  season: {
    type: [String], 
    required: true
  },
  
  items: {
    type: [String], 
    required: true
  },
  imageUrl: {
    type: String, 
    required: true
  },
  category: {
    type: String, 
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Unisex'],
    default: 'Unisex',
    required: true
  },
  
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