import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingCart,
  LocalShipping,
  Payment,
  CheckCircle,
  ArrowBack,
  ArrowForward,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import StripePayment from '../components/payment/StripePayment';

// Sample steps - in a real app, this would come from context/redux
const steps = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

const Cart = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [orderDetails, setOrderDetails] = useState(null);

  // Calculate cart totals
  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (id, change) => {
    updateQuantity(id, change);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handlePaymentSuccess = (paymentDetails) => {
    // Generate a random order number
    const orderNumber = 'ORD-' + Math.floor(Math.random() * 10000);
    
    // Set order details for confirmation page
    setOrderDetails({
      orderNumber,
      paymentDetails,
      date: new Date().toLocaleDateString(),
      items: cart,
      shippingInfo,
      subtotal,
      shipping,
      tax,
      total
    });
    
    // Clear cart and move to confirmation
    clearCart();
    handleNext();
  };

  // Render different steps
  const renderCartItems = () => (
    <>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Your Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
      </Typography>

      {cart.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', mb: 4 }}>
          <ShoppingCart sx={{ fontSize: 60, color: alpha(theme.palette.primary.main, 0.3), mb: 2 }} />
          <Typography variant="h5" gutterBottom>Your cart is empty</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Add medicines to your cart to proceed with checkout.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/shop')}
          >
            Continue Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
              <Table>
                <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar 
                            src={item.image} 
                            alt={item.name} 
                            variant="rounded" 
                            sx={{ width: 60, height: 60, mr: 2 }}
                          />
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.brand}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">${item.discountPrice.toFixed(2)}</TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleQuantityChange(item.id, -1)}
                            disabled={item.quantity <= 1}
                          >
                            <Remove fontSize="small" />
                          </IconButton>
                          <Typography sx={{ mx: 1, minWidth: 30, textAlign: 'center' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton 
                            size="small" 
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            <Add fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        ${(item.discountPrice * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton 
                          color="error" 
                          size="small"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                variant="outlined" 
                startIcon={<ArrowBack />}
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Order Summary
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1">Tax (8%)</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>${tax.toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                  ${total.toFixed(2)}
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                fullWidth
                onClick={handleNext}
                endIcon={<ArrowForward />}
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );

  const renderShipping = () => (
    <>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Shipping Information
      </Typography>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Full Name"
              name="fullName"
              value={shippingInfo.fullName}
              onChange={handleShippingChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Address"
              name="address"
              value={shippingInfo.address}
              onChange={handleShippingChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="City"
              name="city"
              value={shippingInfo.city}
              onChange={handleShippingChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="State/Province"
              name="state"
              value={shippingInfo.state}
              onChange={handleShippingChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="ZIP / Postal code"
              name="zipCode"
              value={shippingInfo.zipCode}
              onChange={handleShippingChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Phone Number"
              name="phone"
              value={shippingInfo.phone}
              onChange={handleShippingChange}
            />
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button 
          variant="outlined" 
          onClick={handleBack}
          startIcon={<ArrowBack />}
        >
          Back to Cart
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleNext}
          endIcon={<ArrowForward />}
        >
          Continue to Payment
        </Button>
      </Box>
    </>
  );

  const renderPayment = () => (
    <>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Payment Information
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <StripePayment 
            amount={total} 
            onSuccess={handlePaymentSuccess} 
            onCancel={handleBack}
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Order Summary
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Subtotal</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Shipping</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1">Tax (8%)</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>${tax.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                ${total.toFixed(2)}
              </Typography>
            </Box>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Shipping to:
              </Typography>
              <Typography variant="body2">
                {shippingInfo.fullName}
              </Typography>
              <Typography variant="body2">
                {shippingInfo.address}
              </Typography>
              <Typography variant="body2">
                {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
              </Typography>
              <Typography variant="body2">
                Phone: {shippingInfo.phone}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );

  const renderConfirmation = () => (
    <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
      <CheckCircle sx={{ fontSize: 80, color: theme.palette.success.main, mb: 2 }} />
      <Typography variant="h4" gutterBottom>Order Placed Successfully!</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Thank you for your order. Your order number is <strong>#{orderDetails?.orderNumber || 'ORD-' + Math.floor(Math.random() * 10000)}</strong>.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        We've sent a confirmation email to your registered email address.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        size="large"
        onClick={() => navigate('/')}
      >
        Return to Home
      </Button>
    </Paper>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {activeStep === 0 && renderCartItems()}
      {activeStep === 1 && renderShipping()}
      {activeStep === 2 && renderPayment()}
      {activeStep === 3 && renderConfirmation()}
    </Container>
  );
};

export default Cart;
