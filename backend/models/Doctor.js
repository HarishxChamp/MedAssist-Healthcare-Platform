const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
  },
  qualifications: [{
    type: String,
    required: true,
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
  availableSlots: [{
    day: String,
    times: [String],
  }],
  consultationFee: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  contactInfo: {
    email: String,
    phone: String,
    emergencyContact: String,
  },
  languages: [{
    type: String,
  }],
});

module.exports = mongoose.model('Doctor', doctorSchema);
