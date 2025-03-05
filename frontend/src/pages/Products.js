import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  MenuItem,
  Box,
  Rating,
  Chip,
  IconButton,
  useTheme,
  Skeleton,
  Snackbar,
  Alert
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  FilterList
} from '@mui/icons-material';
import axios from 'axios';

const API_URL = 'http://localhost:5002/api';

const Products = () => {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const categories = ['Whey Protein', 'Mass Gainer', 'BCAA', 'Pre-Workout'];
  const sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product) => {
    setSnackbar({
      open: true,
      message: `${product.name} added to cart!`,
      severity: 'success'
    });
  };

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!category || product.category === category)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  const LoadingSkeleton = () => (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <Skeleton variant="rectangular" height={300} />
        <CardContent>
          <Skeleton variant="text" height={32} />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="60%" />
        </CardContent>
        <CardActions>
          <Skeleton variant="rectangular" width={100} height={36} />
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <Container sx={{ py: 4 }}>
      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search Products"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              fullWidth
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              fullWidth
              label="Sort By"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={4}>
        {loading
          ? Array.from(new Array(6)).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))
          : filteredProducts.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <IconButton
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
                    }}
                    onClick={() => toggleFavorite(product._id)}
                  >
                    {favorites.includes(product._id) ? (
                      <Favorite color="error" />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                  
                  <CardMedia
                    component="img"
                    height="300"
                    image={product.images[0]}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {product.description}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Chip 
                        label={product.category}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      {product.stock > 0 ? (
                        <Chip 
                          label="In Stock"
                          color="success"
                          size="small"
                        />
                      ) : (
                        <Chip 
                          label="Out of Stock"
                          color="error"
                          size="small"
                        />
                      )}
                    </Box>
                    <Typography variant="h6" color="primary" gutterBottom>
                      ${product.price}
                    </Typography>
                    <Rating 
                      value={4} 
                      readOnly 
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  </CardContent>
                  
                  <CardActions sx={{ p: 2 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Products;
