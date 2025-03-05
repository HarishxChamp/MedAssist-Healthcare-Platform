import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Chip,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Paper,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList,
  Clear,
  LocalHospital,
  MedicalServices,
  Medication,
  Science,
  Article,
  VideoCall,
  ArrowForward,
  StarRate,
} from '@mui/icons-material';

// Mock search results data
const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    experience: '15 years',
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    availability: 'Available Today',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurologist',
    experience: '12 years',
    rating: 4.7,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    availability: 'Available Tomorrow',
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    experience: '8 years',
    rating: 4.9,
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
    availability: 'Available Today',
  },
];

const mockMedicines = [
  {
    id: 1,
    name: 'Amoxicillin 500mg',
    category: 'Antibiotic',
    price: 12.99,
    prescription: true,
    image: 'https://via.placeholder.com/150',
    manufacturer: 'PharmaCorp',
  },
  {
    id: 2,
    name: 'Lisinopril 10mg',
    category: 'Blood Pressure',
    price: 15.49,
    prescription: true,
    image: 'https://via.placeholder.com/150',
    manufacturer: 'MediPharm',
  },
  {
    id: 3,
    name: 'Vitamin D3 1000IU',
    category: 'Supplement',
    price: 8.99,
    prescription: false,
    image: 'https://via.placeholder.com/150',
    manufacturer: 'HealthPlus',
  },
];

const mockArticles = [
  {
    id: 1,
    title: 'Understanding Heart Health: Prevention and Care',
    author: 'Dr. Sarah Johnson',
    date: '2023-05-15',
    category: 'Heart Health',
    image: 'https://via.placeholder.com/150',
    snippet: 'Learn about the latest research in cardiovascular health and preventive measures...',
  },
  {
    id: 2,
    title: 'Childhood Vaccinations: What Parents Need to Know',
    author: 'Dr. Emily Rodriguez',
    date: '2023-06-02',
    category: 'Pediatrics',
    image: 'https://via.placeholder.com/150',
    snippet: 'A comprehensive guide to childhood vaccinations and their importance...',
  },
];

const SearchPage = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [sortBy, setSortBy] = useState('relevance');
  const [filterOpen, setFilterOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Here you would typically fetch search results from an API
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const renderSearchResults = () => {
    switch (activeTab) {
      case 0: // All
        return (
          <>
            {renderDoctorResults(mockDoctors.slice(0, 1))}
            {renderMedicineResults(mockMedicines.slice(0, 1))}
            {renderArticleResults(mockArticles.slice(0, 1))}
          </>
        );
      case 1: // Doctors
        return renderDoctorResults(mockDoctors);
      case 2: // Medicines
        return renderMedicineResults(mockMedicines);
      case 3: // Articles
        return renderArticleResults(mockArticles);
      default:
        return null;
    }
  };

  const renderDoctorResults = (doctors) => (
    <Box sx={{ mb: 4 }}>
      {activeTab === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Doctors
          </Typography>
          <Button 
            endIcon={<ArrowForward />} 
            color="primary"
            onClick={() => setActiveTab(1)}
          >
            View All
          </Button>
        </Box>
      )}
      <Grid container spacing={3}>
        {doctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={doctor.id}>
            <Card 
              elevation={2}
              sx={{ 
                height: '100%',
                borderRadius: 2,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Box sx={{ display: 'flex', p: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                  image={doctor.image}
                  alt={doctor.name}
                />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.specialty} • {doctor.experience}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    <StarRate sx={{ color: '#FFD700', fontSize: 18 }} />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      {doctor.rating}
                    </Typography>
                  </Box>
                  <Chip 
                    label={doctor.availability} 
                    size="small" 
                    color="primary" 
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>
              <Divider />
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" size="small">
                  View Profile
                </Button>
                <Button variant="contained" size="small">
                  Book Appointment
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderMedicineResults = (medicines) => (
    <Box sx={{ mb: 4 }}>
      {activeTab === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Medicines
          </Typography>
          <Button 
            endIcon={<ArrowForward />} 
            color="primary"
            onClick={() => setActiveTab(2)}
          >
            View All
          </Button>
        </Box>
      )}
      <Grid container spacing={3}>
        {medicines.map((medicine) => (
          <Grid item xs={12} sm={6} md={4} key={medicine.id}>
            <Card 
              elevation={2}
              sx={{ 
                height: '100%',
                borderRadius: 2,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={medicine.image}
                alt={medicine.name}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {medicine.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {medicine.category} • {medicine.manufacturer}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="h6" color="primary.main">
                    ${medicine.price}
                  </Typography>
                  {medicine.prescription && (
                    <Chip 
                      label="Prescription Required" 
                      size="small" 
                      color="secondary" 
                    />
                  )}
                </Box>
              </CardContent>
              <Divider />
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" size="small">
                  Details
                </Button>
                <Button variant="contained" size="small">
                  Add to Cart
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderArticleResults = (articles) => (
    <Box sx={{ mb: 4 }}>
      {activeTab === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Health Articles
          </Typography>
          <Button 
            endIcon={<ArrowForward />} 
            color="primary"
            onClick={() => setActiveTab(3)}
          >
            View All
          </Button>
        </Box>
      )}
      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Card 
              elevation={2}
              sx={{ 
                height: '100%',
                borderRadius: 2,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={article.image}
                alt={article.title}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  By {article.author} • {article.date}
                </Typography>
                <Chip 
                  label={article.category} 
                  size="small" 
                  color="primary" 
                  sx={{ mt: 1 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {article.snippet}
                </Typography>
              </CardContent>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Button variant="contained" fullWidth>
                  Read Article
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Search Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Search Medical Resources
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Find doctors, medicines, lab tests, and health information all in one place.
        </Typography>
        <Paper
          component="form"
          elevation={3}
          sx={{ 
            p: 1, 
            display: 'flex', 
            alignItems: 'center',
            borderRadius: 2,
            mb: 2,
          }}
          onSubmit={handleSearch}
        >
          <InputAdornment position="start" sx={{ pl: 1 }}>
            <SearchIcon color="action" />
          </InputAdornment>
          <TextField
            fullWidth
            placeholder="Search for doctors, medicines, treatments..."
            variant="standard"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              disableUnderline: true,
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClearSearch}>
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ ml: 1 }}
          />
          <Button 
            variant="contained" 
            type="submit"
            sx={{ borderRadius: 2, ml: 1 }}
          >
            Search
          </Button>
        </Paper>
        
        {/* Quick Search Categories */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
          <Chip 
            icon={<LocalHospital />} 
            label="Doctors" 
            onClick={() => setActiveTab(1)}
            color={activeTab === 1 ? "primary" : "default"}
          />
          <Chip 
            icon={<Medication />} 
            label="Medicines" 
            onClick={() => setActiveTab(2)}
            color={activeTab === 2 ? "primary" : "default"}
          />
          <Chip 
            icon={<Science />} 
            label="Lab Tests" 
            onClick={() => {}}
          />
          <Chip 
            icon={<MedicalServices />} 
            label="Treatments" 
            onClick={() => {}}
          />
          <Chip 
            icon={<Article />} 
            label="Health Articles" 
            onClick={() => setActiveTab(3)}
            color={activeTab === 3 ? "primary" : "default"}
          />
          <Chip 
            icon={<VideoCall />} 
            label="Video Consult" 
            onClick={() => {}}
          />
        </Box>
      </Box>

      {/* Search Results */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2,
          flexWrap: 'wrap',
          gap: 2,
        }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{
              '.MuiTabs-indicator': {
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            <Tab label="All" />
            <Tab label="Doctors" />
            <Tab label="Medicines" />
            <Tab label="Articles" />
          </Tabs>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                label="Sort By"
              >
                <MenuItem value="relevance">Relevance</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
                <MenuItem value="price_low">Price: Low to High</MenuItem>
                <MenuItem value="price_high">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
            
            <Button 
              startIcon={<FilterList />}
              variant="outlined"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              Filters
            </Button>
          </Box>
        </Box>
        
        {/* Filter Panel - can be expanded with more filters */}
        {filterOpen && (
          <Paper 
            elevation={2} 
            sx={{ 
              p: 2, 
              mb: 3, 
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Filter Results
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Specialty</InputLabel>
                  <Select
                    label="Specialty"
                    value=""
                  >
                    <MenuItem value="cardiology">Cardiology</MenuItem>
                    <MenuItem value="neurology">Neurology</MenuItem>
                    <MenuItem value="pediatrics">Pediatrics</MenuItem>
                    <MenuItem value="dermatology">Dermatology</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Availability</InputLabel>
                  <Select
                    label="Availability"
                    value=""
                  >
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="tomorrow">Tomorrow</MenuItem>
                    <MenuItem value="this_week">This Week</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Rating</InputLabel>
                  <Select
                    label="Rating"
                    value=""
                  >
                    <MenuItem value="4_plus">4+ Stars</MenuItem>
                    <MenuItem value="3_plus">3+ Stars</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="contained" fullWidth>
                    Apply Filters
                  </Button>
                  <Button variant="outlined">
                    Clear
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}
        
        {/* Search Results Content */}
        {renderSearchResults()}
      </Box>
    </Container>
  );
};

export default SearchPage;
