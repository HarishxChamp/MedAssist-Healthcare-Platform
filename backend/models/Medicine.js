const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genericName: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Other'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  prescription: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
  sideEffects: [{
    type: String,
  }],
  usage: {
    type: String,
    required: true,
  },
  dosageForm: {
    type: String,
    required: true,
  },
  strength: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
  },
  alternatives: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
  }],
});

module.exports = mongoose.model('Medicine', medicineSchema);
