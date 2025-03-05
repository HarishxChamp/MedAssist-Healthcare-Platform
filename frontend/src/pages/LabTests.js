import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Search,
  ExpandMore,
  Science,
  LocalOffer,
  Home,
  Timer,
  CheckCircle,
  Assignment,
  CalendarMonth,
  AccessTime,
} from '@mui/icons-material';

const categories = [
  'All Tests',
  'Health Packages',
  'COVID-19',
  'Diabetes',
  'Thyroid',
  'Vitamins',
  'Liver',
  'Kidney',
  'Heart',
];

const tests = [
  {
    id: 1,
    name: 'Complete Blood Count (CBC)',
    category: 'Health Packages',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    parameters: 25,
    sampleType: 'Blood',
    reportTime: '24 hours',
    preparation: 'Fasting for 8-10 hours',
    description: 'Measures various components of blood including RBC, WBC, platelets, hemoglobin, and more.',
    included: [
      'Red Blood Cell Count',
      'White Blood Cell Count',
      'Platelet Count',
      'Hemoglobin',
      'Hematocrit',
    ],
  },
  {
    id: 2,
    name: 'Diabetes Screening',
    category: 'Diabetes',
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    parameters: 8,
    sampleType: 'Blood',
    reportTime: '24 hours',
    preparation: 'Fasting for 12 hours',
    description: 'Comprehensive diabetes screening including blood glucose and HbA1c levels.',
    included: [
      'Fasting Blood Sugar',
      'Post Prandial Blood Sugar',
      'HbA1c',
      'Insulin',
    ],
  },
  {
    id: 3,
    name: 'Thyroid Profile',
    category: 'Thyroid',
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    parameters: 3,
    sampleType: 'Blood',
    reportTime: '24 hours',
    preparation: 'No special preparation required',
    description: 'Complete thyroid function assessment including T3, T4, and TSH levels.',
    included: [
      'T3 (Triiodothyronine)',
      'T4 (Thyroxine)',
      'TSH (Thyroid Stimulating Hormone)',
    ],
  },
];

const steps = ['Select Tests', 'Schedule', 'Sample Collection', 'Reports'];

const LabTests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Lab Tests & Health Packages
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Book diagnostic tests & health checkup packages from certified labs
        </Typography>

        {/* Search and Filter */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search tests, packages..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
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
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Categories */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setCategory(cat)}
                color={category === cat ? 'primary' : 'default'}
                icon={<Science />}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </Box>

        {/* Booking Process */}
        <Box sx={{ mb: 4 }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Tests List */}
        <Grid container spacing={3}>
          {tests.map((test) => (
            <Grid item xs={12} md={6} key={test.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">
                      {test.name}
                    </Typography>
                    <Chip
                      label={`${test.discount}% OFF`}
                      color="error"
                      size="small"
                      icon={<LocalOffer />}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Chip
                      icon={<Assignment />}
                      label={`${test.parameters} Parameters`}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                    <Chip
                      icon={<Timer />}
                      label={`Report in ${test.reportTime}`}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                    <Chip
                      icon={<Home />}
                      label="Home Collection Available"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {test.description}
                  </Typography>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Test Includes</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        {test.included.map((item, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <CheckCircle color="primary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Box>
                      <Typography variant="h6" color="primary">
                        ${test.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: 'line-through' }}
                      >
                        ${test.originalPrice}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                    >
                      Book Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Why Choose Us */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Why Choose Our Lab Services?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Science color="primary" sx={{ fontSize: 40, mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    NABL Accredited Labs
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    All tests are conducted in certified laboratories
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Home color="primary" sx={{ fontSize: 40, mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Home Collection
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Free sample collection from your doorstep
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Timer color="primary" sx={{ fontSize: 40, mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Timely Reports
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Get digital reports within 24-48 hours
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <LocalOffer color="primary" sx={{ fontSize: 40, mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Affordable Prices
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Best rates with additional discounts
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default LabTests;
