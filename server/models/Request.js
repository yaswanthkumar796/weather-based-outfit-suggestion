const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  weatherCondition: { 
    type: [String], 
    required: true
  },
  tempMin: {
    type: Number, 
    required: true
  },
  tempMax: {
    type: Number, 
    required: true
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
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Request', RequestSchema);
