const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  type: {
    type: String,
    enum: ['Government', 'Private', 'Specialized'],
    required: true,
  },
  specialties: [{
    type: String,
  }],
  facilities: [{
    type: String,
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now,
    },
  }],
  images: [{
    type: String,
  }],
  contactInfo: {
    email: String,
    phone: String,
    emergencyNumber: String,
    website: String,
  },
  operatingHours: {
    weekdays: {
      open: String,
      close: String,
    },
    weekends: {
      open: String,
      close: String,
    },
  },
  emergencyServices: {
    type: Boolean,
    default: false,
  },
  insurance: [{
    provider: String,
    coverageType: String,
  }],
});

module.exports = mongoose.model('Hospital', hospitalSchema);
