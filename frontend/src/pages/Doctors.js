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
  Avatar,
  Rating,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Search,
  LocationOn,
  Star,
  VideoCall,
  Favorite,
  FavoriteBorder,
  FilterList,
} from '@mui/icons-material';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    hospital: 'City General Hospital',
    experience: '15 years',
    rating: 4.9,
    reviews: 128,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    location: 'Downtown Medical Center',
    availability: 'Available Today',
    fee: 100,
    education: 'MD - Cardiology, MBBS',
    languages: ['English', 'Spanish'],
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurologist',
    hospital: 'Metro Neurology Center',
    experience: '12 years',
    rating: 4.8,
    reviews: 96,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: 'Uptown Medical Plaza',
    availability: 'Next Available: Tomorrow',
    fee: 120,
    education: 'MD - Neurology, MBBS',
    languages: ['English', 'Mandarin'],
  },
  {
    id: 3,
    name: 'Dr. Emily Williams',
    specialty: 'Pediatrician',
    hospital: "Children's Medical Center",
    experience: '10 years',
    rating: 4.7,
    reviews: 156,
    image: 'https://randomuser.me/api/portraits/women/42.jpg',
    location: 'Family Care Complex',
    availability: 'Available Today',
    fee: 90,
    education: 'MD - Pediatrics, MBBS',
    languages: ['English', 'French'],
  },
];

const specialties = [
  'Cardiologist',
  'Neurologist',
  'Pediatrician',
  'Dermatologist',
  'Orthopedic',
  'Dentist',
  'Ophthalmologist',
  'All Specialties',
];

const Doctors = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (doctorId) => {
    if (favorites.includes(doctorId)) {
      setFavorites(favorites.filter(id => id !== doctorId));
    } else {
      setFavorites([...favorites, doctorId]);
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container>
        {/* Search and Filter Section */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search doctors by name, specialty..."
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
                <InputLabel>Specialty</InputLabel>
                <Select
                  value={specialty}
                  label="Specialty"
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  {specialties.map((spec) => (
                    <MenuItem key={spec} value={spec}>
                      {spec}
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
                  <MenuItem value="rating">Rating</MenuItem>
                  <MenuItem value="experience">Experience</MenuItem>
                  <MenuItem value="fee">Consultation Fee</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<FilterList />}
                sx={{ height: '100%' }}
              >
                More Filters
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Popular Specialties */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Popular Specialties
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {specialties.slice(0, 6).map((spec) => (
              <Chip
                key={spec}
                label={spec}
                onClick={() => setSpecialty(spec)}
                color={specialty === spec ? 'primary' : 'default'}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </Box>

        {/* Doctors List */}
        <Grid container spacing={3}>
          {doctors.map((doctor) => (
            <Grid item xs={12} md={6} lg={4} key={doctor.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Avatar
                        src={doctor.image}
                        sx={{ width: 64, height: 64 }}
                      />
                      <Box>
                        <Typography variant="h6">
                          {doctor.name}
                        </Typography>
                        <Typography color="text.secondary" gutterBottom>
                          {doctor.specialty}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Rating
                            value={doctor.rating}
                            readOnly
                            precision={0.1}
                            size="small"
                          />
                          <Typography variant="body2" color="text.secondary">
                            ({doctor.reviews})
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <IconButton
                      onClick={() => toggleFavorite(doctor.id)}
                      color="primary"
                    >
                      {favorites.includes(doctor.id) ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn fontSize="small" color="action" />
                      {doctor.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {doctor.hospital}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                      <Chip
                        label={`${doctor.experience} exp`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      {doctor.languages.map((lang) => (
                        <Chip
                          key={lang}
                          label={lang}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" color="success.main">
                        {doctor.availability}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ${doctor.fee}
                      </Typography>
                    </Box>
                    <Box>
                      <Button
                        variant="outlined"
                        startIcon={<VideoCall />}
                        sx={{ mr: 1 }}
                      >
                        Video
                      </Button>
                      <Button variant="contained">
                        Book
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Doctors;
