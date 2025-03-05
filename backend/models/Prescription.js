const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  medications: [{
    name: {
      type: String,
      required: true
    },
    dosage: {
      type: String,
      required: true
    },
    frequency: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    instructions: String,
    startDate: Date,
    endDate: Date
  }],
  tests: [{
    name: String,
    instructions: String
  }],
  advice: String,
  followUp: {
    required: Boolean,
    date: Date,
    notes: String
  },
  additionalNotes: String,
  isFilled: {
    type: Boolean,
    default: false
  },
  filledDate: Date,
  filledBy: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
