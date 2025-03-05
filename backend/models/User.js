const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin'],
    default: 'patient',
  },
  profile: {
    // Patient specific fields
    dateOfBirth: Date,
    gender: String,
    bloodGroup: String,
    height: Number,
    weight: Number,
    allergies: [String],
    chronicConditions: [String],
    
    // Doctor specific fields
    specialty: String,
    hospital: String,
    experience: String,
    education: String,
    about: String,
    availability: [{
      day: String,
      slots: [String]
    }],
    rating: {
      type: Number,
      default: 0
    },
    totalPatients: {
      type: Number,
      default: 0
    },
    consultationFee: Number,
    image: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  contactInfo: {
    phone: String,
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
    },
  },
  medicalHistory: [{
    condition: String,
    diagnosedDate: Date,
    medications: [String],
    notes: String,
  }],
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
  }],
  prescriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription',
  }],
  insurance: {
    provider: String,
    policyNumber: String,
    validUntil: Date,
  },
  notifications: [{
    message: String,
    type: {
      type: String,
      enum: ['appointment', 'prescription', 'general'],
      default: 'general'
    },
    read: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
