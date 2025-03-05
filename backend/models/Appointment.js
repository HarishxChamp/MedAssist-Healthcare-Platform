const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'Checked-in'],
    default: 'Pending',
  },
  type: {
    type: String,
    enum: ['In-person', 'Video Consultation', 'Follow-up'],
    required: true,
  },
  symptoms: [{
    type: String,
  }],
  notes: {
    type: String,
  },
  prescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Refunded'],
    default: 'Pending',
  },
  paymentAmount: {
    type: Number,
    default: 0,
  },
  meetingLink: {
    type: String
  },
  rating: {
    score: {
      type: Number,
      min: 1,
      max: 5
    },
    feedback: String
  },
  cancelReason: String,
  checkinTime: Date,
  completedTime: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
