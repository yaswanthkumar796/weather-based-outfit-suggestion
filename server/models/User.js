const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no two users share the same email
  },
  password: {
    type: String,
    required: true,
  },
  location: { // Stored for personalized weather fetch
    latitude: Number,
    longitude: Number,
  },
  preferences: { // Filters for recommendations
    favoriteSeasons: [String], // e.g., ['Summer', 'Spring']
    avoidColors: [String],     // e.g., ['Neon', 'Brown']
    style: String,             // e.g., 'Casual', 'Formal', 'Sporty'
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('User', UserSchema);