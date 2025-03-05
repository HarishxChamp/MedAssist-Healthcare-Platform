import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  CreditCard,
  Event,
  Lock,
} from '@mui/icons-material';

const StripePayment = ({ amount, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const validateForm = () => {
    // Basic validation
    if (!paymentInfo.cardNumber.trim()) {
      setError('Card number is required');
      return false;
    }
    if (!paymentInfo.cardName.trim()) {
      setError('Cardholder name is required');
      return false;
    }
    if (!paymentInfo.expiryDate.trim()) {
      setError('Expiry date is required');
      return false;
    }
    if (!paymentInfo.cvv.trim()) {
      setError('CVV is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate API call to Stripe
    setTimeout(() => {
      setLoading(false);
      // In a real implementation, this would be an actual Stripe API call
      // For demo purposes, we'll just simulate a successful payment
      onSuccess({
        id: 'pi_' + Math.random().toString(36).substr(2, 9),
        amount: amount,
        created: new Date().getTime(),
        status: 'succeeded',
        payment_method: 'card',
        last4: paymentInfo.cardNumber.slice(-4),
      });
    }, 2000);
  };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Lock sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" fontWeight={600}>
          Secure Payment
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Card Number"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={paymentInfo.cardNumber}
              onChange={handleChange}
              InputProps={{
                startAdornment: <CreditCard sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Cardholder Name"
              name="cardName"
              placeholder="John Smith"
              value={paymentInfo.cardName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Expiry Date"
              name="expiryDate"
              placeholder="MM/YY"
              value={paymentInfo.expiryDate}
              onChange={handleChange}
              InputProps={{
                startAdornment: <Event sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="CVV"
              name="cvv"
              placeholder="123"
              value={paymentInfo.cvv}
              onChange={handleChange}
              type="password"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
          </Button>
        </Box>
      </form>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Your payment information is encrypted and secure. We do not store your credit card details.
        </Typography>
      </Box>
    </Paper>
  );
};

export default StripePayment;
