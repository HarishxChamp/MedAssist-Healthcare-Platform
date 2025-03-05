import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Tabs,
  Tab,
  Rating,
  Badge,
  Divider,
  useTheme,
  alpha,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';
import {
  Search,
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  FilterList,
  LocalOffer,
  AddShoppingCart,
  RemoveShoppingCart,
  ArrowForward,
  LocalShipping,
  Schedule,
  VerifiedUser,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';

// Sample medicine data
const medicines = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    brand: 'MedPlus',
    price: 5.99,
    discountPrice: 4.99,
    image: 'https://via.placeholder.com/300x200?text=Paracetamol',
    rating: 4.5,
    reviews: 128,
    description: 'Effective pain relief for headaches, muscle aches, and fever reduction.',
    inStock: true,
    prescription: false,
    tags: ['bestseller', 'offer'],
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    brand: 'HealthPharm',
    price: 12.99,
    discountPrice: 10.99,
    image: 'https://via.placeholder.com/300x200?text=Amoxicillin',
    rating: 4.8,
    reviews: 95,
    description: 'Antibiotic used to treat a number of bacterial infections.',
    inStock: true,
    prescription: true,
    tags: ['prescription'],
  },
  {
    id: 3,
    name: 'Vitamin D3 1000IU',
    category: 'Vitamins & Supplements',
    brand: 'NutriLife',
    price: 8.99,
    discountPrice: 7.49,
    image: 'https://via.placeholder.com/300x200?text=Vitamin+D3',
    rating: 4.7,
    reviews: 210,
    description: 'Supports bone health, immune function, and overall wellness.',
    inStock: true,
    prescription: false,
    tags: ['offer'],
  },
  {
    id: 4,
    name: 'Omeprazole 20mg',
    category: 'Digestive Health',
    brand: 'GastroEase',
    price: 14.99,
    discountPrice: 12.99,
    image: 'https://via.placeholder.com/300x200?text=Omeprazole',
    rating: 4.6,
    reviews: 156,
    description: 'Reduces stomach acid production to treat heartburn and acid reflux.',
    inStock: true,
    prescription: false,
    tags: [],
  },
  {
    id: 5,
    name: 'Cetirizine 10mg',
    category: 'Allergy Relief',
    brand: 'AllerFree',
    price: 7.99,
    discountPrice: 6.49,
    image: 'https://via.placeholder.com/300x200?text=Cetirizine',
    rating: 4.4,
    reviews: 178,
    description: 'Provides 24-hour relief from allergy symptoms like sneezing and itching.',
    inStock: true,
    prescription: false,
    tags: ['bestseller'],
  },
  {
    id: 6,
    name: 'Insulin Glargine',
    category: 'Diabetes Care',
    brand: 'DiabeCare',
    price: 45.99,
    discountPrice: 45.99,
    image: 'https://via.placeholder.com/300x200?text=Insulin',
    rating: 4.9,
    reviews: 89,
    description: 'Long-acting insulin for diabetes management.',
    inStock: true,
    prescription: true,
    tags: ['prescription'],
  },
  {
    id: 7,
    name: 'Ibuprofen 400mg',
    category: 'Pain Relief',
    brand: 'PainStop',
    price: 6.99,
    discountPrice: 5.99,
    image: 'https://via.placeholder.com/300x200?text=Ibuprofen',
    rating: 4.3,
    reviews: 145,
    description: 'Anti-inflammatory medication for pain relief and fever reduction.',
    inStock: true,
    prescription: false,
    tags: [],
  },
  {
    id: 8,
    name: 'Multivitamin Complex',
    category: 'Vitamins & Supplements',
    brand: 'VitaWell',
    price: 15.99,
    discountPrice: 13.99,
    image: 'https://via.placeholder.com/300x200?text=Multivitamin',
    rating: 4.7,
    reviews: 203,
    description: 'Complete daily multivitamin with essential nutrients for overall health.',
    inStock: true,
    prescription: false,
    tags: ['bestseller', 'offer'],
  },
];

// Categories
const categories = [
  'All Categories',
  'Pain Relief',
  'Antibiotics',
  'Vitamins & Supplements',
  'Digestive Health',
  'Allergy Relief',
  'Diabetes Care',
  'Heart Health',
  'Respiratory Care',
  'Skin Care',
];

const Shop = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { cart, addToCart, getCartItemCount } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('popularity');
  const [currentTab, setCurrentTab] = useState(0);
  const [page, setPage] = useState(1);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleAddToCart = (medicine) => {
    addToCart(medicine);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Filter medicines based on search and category
  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = category === 'All Categories' || medicine.category === category;
    
    const matchesTab = (currentTab === 0) || 
                      (currentTab === 1 && medicine.tags.includes('bestseller')) ||
                      (currentTab === 2 && medicine.tags.includes('offer')) ||
                      (currentTab === 3 && medicine.prescription);
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  // Sort medicines
  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.discountPrice - b.discountPrice;
      case 'price-high':
        return b.discountPrice - a.discountPrice;
      case 'rating':
        return b.rating - a.rating;
      case 'popularity':
      default:
        return b.reviews - a.reviews;
    }
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Online Pharmacy
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Order medicines online and get them delivered to your doorstep
      </Typography>

      {/* Search and Filter Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search medicines, brands, health conditions..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={handleSearch}
                      sx={{ borderRadius: 1 }}
                    >
                      Search
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={category}
                onChange={handleCategoryChange}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="sort-select-label">Sort By</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={sortBy}
                onChange={handleSortChange}
                label="Sort By"
              >
                <MenuItem value="popularity">Popularity</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Box sx={{ mb: 4 }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              minWidth: 120,
            },
          }}
        >
          <Tab label="All Medicines" />
          <Tab label="Bestsellers" />
          <Tab label="Offers" />
          <Tab label="Prescription" />
        </Tabs>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={3}>
        {sortedMedicines.map((medicine) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={medicine.id}>
            <Card 
              elevation={2} 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 40px -12px rgba(0,0,0,0.2)',
                },
                position: 'relative',
                borderRadius: 2,
              }}
            >
              {medicine.tags.includes('bestseller') && (
                <Chip 
                  label="Bestseller" 
                  color="primary" 
                  size="small" 
                  sx={{ 
                    position: 'absolute', 
                    top: 10, 
                    left: 10, 
                    zIndex: 1,
                    fontWeight: 600,
                  }} 
                />
              )}
              {medicine.tags.includes('offer') && (
                <Chip 
                  label="Offer" 
                  color="secondary" 
                  size="small" 
                  icon={<LocalOffer fontSize="small" />}
                  sx={{ 
                    position: 'absolute', 
                    top: medicine.tags.includes('bestseller') ? 45 : 10, 
                    left: 10, 
                    zIndex: 1,
                    fontWeight: 600,
                  }} 
                />
              )}
              <CardMedia
                component="img"
                height="160"
                image={medicine.image}
                alt={medicine.name}
                sx={{ objectFit: 'contain', p: 2, bgcolor: alpha(theme.palette.primary.main, 0.05) }}
              />
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {medicine.brand}
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, height: 48, overflow: 'hidden' }}>
                  {medicine.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={medicine.rating} precision={0.1} size="small" readOnly />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({medicine.reviews})
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: 40, overflow: 'hidden' }}>
                  {medicine.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                    ${medicine.discountPrice}
                  </Typography>
                  {medicine.price !== medicine.discountPrice && (
                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through', ml: 1 }}>
                      ${medicine.price}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip 
                    label={medicine.prescription ? "Prescription Required" : "No Prescription"} 
                    size="small"
                    color={medicine.prescription ? "warning" : "success"}
                    sx={{ height: 24, fontSize: '0.75rem' }}
                  />
                  <IconButton 
                    color="primary" 
                    onClick={() => handleAddToCart(medicine)}
                    sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                      }
                    }}
                  >
                    <AddShoppingCart />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {filteredMedicines.length > 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Pagination 
            count={Math.ceil(filteredMedicines.length / 8)} 
            page={page} 
            onChange={handlePageChange} 
            color="primary"
            size="large"
          />
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 6, p: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No medicines found matching your criteria.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ mt: 2 }}
            onClick={() => {
              setSearchTerm('');
              setCategory('All Categories');
              setCurrentTab(0);
            }}
          >
            Clear Filters
          </Button>
        </Box>
      )}

      {/* Features */}
      <Grid container spacing={4} sx={{ mt: 6, mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalShipping sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Free Delivery</Typography>
              <Typography variant="body2" color="text.secondary">On orders above $25</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Schedule sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Quick Delivery</Typography>
              <Typography variant="body2" color="text.secondary">Within 24-48 hours</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <VerifiedUser sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Genuine Medicines</Typography>
              <Typography variant="body2" color="text.secondary">100% authentic products</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Online Pharmacy
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCart />}
          onClick={() => navigate('/cart')}
          sx={{ 
            borderRadius: 2,
            px: 2,
          }}
        >
          Cart ({getCartItemCount()})
        </Button>
      </Box>
    </Container>
  );
};

export default Shop;
