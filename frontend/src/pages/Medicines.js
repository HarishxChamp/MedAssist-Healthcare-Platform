import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Badge,
  Rating,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import {
  Search,
  ShoppingCart,
  FilterList,
  Add,
  Remove,
  LocalOffer,
  LocalPharmacy,
  Close,
} from '@mui/icons-material';

const categories = [
  'All Medicines',
  'Prescription Drugs',
  'Over-the-Counter',
  'Vitamins & Supplements',
  'Personal Care',
  'Healthcare Devices',
  'Baby Care',
  'Ayurvedic',
  'Homeopathy',
];

const medicines = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    brand: 'HealthCare Plus',
    category: 'Over-the-Counter',
    price: 9.99,
    originalPrice: 12.99,
    image: 'https://via.placeholder.com/200x200',
    rating: 4.5,
    reviews: 128,
    description: 'Pain reliever and fever reducer',
    prescription: false,
    stock: 50,
    discount: 23,
  },
  {
    id: 2,
    name: 'Vitamin D3 1000IU',
    brand: 'NutriLife',
    category: 'Vitamins & Supplements',
    price: 14.99,
    originalPrice: 19.99,
    image: 'https://via.placeholder.com/200x200',
    rating: 4.8,
    reviews: 256,
    description: 'Supports bone health and immune system',
    prescription: false,
    stock: 100,
    discount: 25,
  },
  {
    id: 3,
    name: 'Blood Pressure Monitor',
    brand: 'MediTech',
    category: 'Healthcare Devices',
    price: 49.99,
    originalPrice: 59.99,
    image: 'https://via.placeholder.com/200x200',
    rating: 4.6,
    reviews: 89,
    description: 'Digital BP monitor with memory function',
    prescription: false,
    stock: 15,
    discount: 17,
  },
];

const Medicines = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (medicine) => {
    const existingItem = cart.find(item => item.id === medicine.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === medicine.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (medicineId) => {
    const existingItem = cart.find(item => item.id === medicineId);
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => item.id !== medicineId));
    } else {
      setCart(cart.map(item =>
        item.id === medicineId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const CartDrawer = () => (
    <Drawer
      anchor="right"
      open={cartOpen}
      onClose={() => setCartOpen(false)}
    >
      <Box sx={{ width: 350, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Shopping Cart</Typography>
          <IconButton onClick={() => setCartOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        {cart.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
            Your cart is empty
          </Typography>
        ) : (
          <>
            <List>
              {cart.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem>
                    <Box sx={{ display: 'flex', width: '100%' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: 50, height: 50, marginRight: 16 }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${item.price} x {item.quantity}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                          size="small"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Remove />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => addToCart(item)}
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </Box>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>
                Cart Total: ${cartTotal.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => {/* Handle checkout */}}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );

  return (
    <Box sx={{ py: 4 }}>
      <Container>
        {/* Search and Filter Section */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                placeholder="Search medicines, healthcare products..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="popularity">Popularity</MenuItem>
                  <MenuItem value="price_low">Price: Low to High</MenuItem>
                  <MenuItem value="price_high">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Customer Rating</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={1}>
              <IconButton
                sx={{
                  height: '100%',
                  width: '100%',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
                onClick={() => setCartOpen(true)}
              >
                <Badge badgeContent={cart.length} color="primary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Grid>
          </Grid>
        </Box>

        {/* Categories */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Browse by Category
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setCategory(cat)}
                color={category === cat ? 'primary' : 'default'}
                icon={<LocalPharmacy />}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {medicines.map((medicine) => (
            <Grid item xs={12} sm={6} md={4} key={medicine.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={medicine.image}
                    alt={medicine.name}
                  />
                  {medicine.discount > 0 && (
                    <Chip
                      label={`${medicine.discount}% OFF`}
                      color="error"
                      size="small"
                      icon={<LocalOffer />}
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                      }}
                    />
                  )}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {medicine.brand}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {medicine.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating
                      value={medicine.rating}
                      readOnly
                      size="small"
                      precision={0.1}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({medicine.reviews})
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {medicine.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                    <Typography variant="h6" color="primary">
                      ${medicine.price}
                    </Typography>
                    {medicine.originalPrice > medicine.price && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: 'line-through', ml: 1 }}
                      >
                        ${medicine.originalPrice}
                      </Typography>
                    )}
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<Add />}
                    onClick={() => addToCart(medicine)}
                    disabled={medicine.stock === 0}
                  >
                    {medicine.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <CartDrawer />
      </Container>
    </Box>
  );
};

export default Medicines;
