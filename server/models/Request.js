const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Request', RequestSchema);
