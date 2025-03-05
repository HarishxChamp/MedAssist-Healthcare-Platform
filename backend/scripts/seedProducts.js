require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  {
    name: 'Premium Whey Protein',
    description: 'High-quality whey protein isolate for maximum muscle recovery and growth.',
    price: 49.99,
    category: 'Whey Protein',
    stock: 100,
    images: ['whey-protein-1.jpg'],
    weight: {
      value: 2,
      unit: 'kg'
    },
    nutritionalInfo: {
      servingSize: '30g',
      servingsPerContainer: 66,
      protein: 24,
      carbs: 3,
      fat: 1,
      calories: 120
    },
    flavors: ['Chocolate', 'Vanilla', 'Strawberry'],
    featured: true
  },
  {
    name: 'Mass Gainer Pro',
    description: 'High-calorie formula for muscle mass gain with added vitamins and minerals.',
    price: 54.99,
    category: 'Mass Gainer',
    stock: 75,
    images: ['mass-gainer-1.jpg'],
    weight: {
      value: 5,
      unit: 'kg'
    },
    nutritionalInfo: {
      servingSize: '150g',
      servingsPerContainer: 33,
      protein: 50,
      carbs: 250,
      fat: 10,
      calories: 1250
    },
    flavors: ['Chocolate', 'Vanilla', 'Banana'],
    featured: true
  },
  {
    name: 'BCAA Energy',
    description: 'Branch Chain Amino Acids with added caffeine for enhanced performance and recovery.',
    price: 29.99,
    category: 'BCAA',
    stock: 150,
    images: ['bcaa-1.jpg'],
    weight: {
      value: 400,
      unit: 'g'
    },
    nutritionalInfo: {
      servingSize: '10g',
      servingsPerContainer: 40,
      protein: 0,
      carbs: 0,
      fat: 0,
      calories: 5
    },
    flavors: ['Blue Raspberry', 'Fruit Punch', 'Lemon Lime'],
    featured: false
  },
  {
    name: 'Pre-Workout Extreme',
    description: 'Advanced pre-workout formula for maximum energy, focus, and pump.',
    price: 39.99,
    category: 'Pre-Workout',
    stock: 100,
    images: ['pre-workout-1.jpg'],
    weight: {
      value: 300,
      unit: 'g'
    },
    nutritionalInfo: {
      servingSize: '15g',
      servingsPerContainer: 20,
      protein: 0,
      carbs: 2,
      fat: 0,
      calories: 10
    },
    flavors: ['Fruit Punch', 'Blue Ice', 'Watermelon'],
    featured: true
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    await Product.deleteMany({}); // Clear existing products
    await Product.insertMany(products);
    
    console.log('Products seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
