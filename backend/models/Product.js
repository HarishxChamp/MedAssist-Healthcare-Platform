const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Whey Protein', 'Mass Gainer', 'BCAA', 'Pre-Workout', 'Creatine', 'Other']
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  images: [{
    type: String,
    required: true
  }],
  weight: {
    value: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      enum: ['g', 'kg', 'lb'],
      required: true
    }
  },
  nutritionalInfo: {
    servingSize: String,
    servingsPerContainer: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    calories: Number
  },
  flavors: [{
    type: String
  }],
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  discount: {
    percentage: {
      type: Number,
      min: 0,
      max: 100
    },
    validUntil: Date
  }
}, {
  timestamps: true
});

// Calculate average rating before saving
productSchema.pre('save', function(next) {
  if (this.ratings.length > 0) {
    this.averageRating = this.ratings.reduce((acc, item) => acc + item.rating, 0) / this.ratings.length;
  }
  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
