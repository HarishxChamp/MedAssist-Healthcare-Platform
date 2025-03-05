import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  CardActionArea,
  CardActions,
  Chip,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  styled,
  alpha,
} from '@mui/material';
import {
  Search,
  LocalHospital,
  MedicalServices,
  AccessTime,
  Star,
  LocationOn,
  Phone,
  VideoCall,
  ArrowForward,
  CalendarMonth,
  HealthAndSafety,
  MedicalInformation,
  LocalPharmacy,
  Medication,
  PersonSearch,
  SupportAgent,
  MonitorHeart,
  Videocam,
  Science,
} from '@mui/icons-material';

// Styled components for enhanced UI
const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 16,
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
  border: '1px solid rgba(0,0,0,0.05)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
    '& .icon-container': {
      backgroundColor: '#4A148C',
      transform: 'scale(1.1)',
    }
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 64,
  height: 64,
  borderRadius: '50%',
  backgroundColor: 'rgba(26, 54, 93, 0.1)',
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '& svg': {
    fontSize: 32,
    color: theme.palette.primary.main,
    transition: 'all 0.3s ease',
  }
}));

const DoctorCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
  border: '1px solid rgba(0,0,0,0.05)',
  backgroundColor: '#fff',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
    '& .doctor-image': {
      transform: 'scale(1.05)',
    }
  },
}));

const EmergencyCard = styled(Card)(({ theme, available }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  backgroundColor: available ? alpha(theme.palette.success.main, 0.05) : alpha(theme.palette.error.main, 0.05),
  borderLeft: available ? `4px solid ${theme.palette.success.main}` : `4px solid ${theme.palette.error.main}`,
  borderRadius: 12,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 30,
    backgroundColor: theme.palette.background.paper,
    '&.Mui-focused': {
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const services = [
    {
      title: 'Online Consultations',
      description: 'Connect with healthcare professionals from the comfort of your home.',
      icon: <Videocam className="icon" />,
      action: 'Start Consultation',
      color: '#1A365D',
      bgColor: 'rgba(26, 54, 93, 0.1)',
      path: '/video-consult',
    },
    {
      title: 'Medication Delivery',
      description: 'Get your prescriptions delivered right to your doorstep.',
      icon: <LocalPharmacy className="icon" />,
      action: 'Order Now',
      color: '#38A169',
      bgColor: 'rgba(56, 161, 105, 0.1)',
      path: '/shop',
    },
    {
      title: 'Health Monitoring',
      description: 'Track your vital signs and health metrics with our advanced tools.',
      icon: <MonitorHeart className="icon" />,
      action: 'Start Monitoring',
      color: '#1A365D',
      bgColor: 'rgba(26, 54, 93, 0.1)',
      path: '/monitoring',
    },
    {
      title: 'Lab Tests',
      description: 'Book lab tests online and get results digitally.',
      icon: <Science className="icon" />,
      action: 'Book Test',
      color: '#38A169',
      bgColor: 'rgba(56, 161, 105, 0.1)',
      path: '/lab-tests',
    },
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.9,
      reviews: 124,
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      availability: 'Available Today',
      experience: '15 years',
      location: 'Central Hospital',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      rating: 4.8,
      reviews: 98,
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
      availability: 'Available Tomorrow',
      experience: '12 years',
      location: 'Metro Medical Center',
    },
    {
      id: 3,
      name: 'Dr. Emily Williams',
      specialty: 'Pediatrician',
      rating: 4.9,
      reviews: 156,
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      availability: 'Available Today',
      experience: '10 years',
      location: 'Children\'s Hospital',
    },
    {
      id: 4,
      name: 'Dr. Robert Miller',
      specialty: 'Orthopedic Surgeon',
      rating: 4.7,
      reviews: 87,
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      availability: 'Available in 2 days',
      experience: '18 years',
      location: 'Orthopedic Institute',
    },
  ];

  const emergencyServices = [
    {
      name: 'City General Hospital',
      distance: '2.5 km',
      contact: '911',
      available: true,
      waitTime: '10-15 min',
      address: '123 Medical Center Blvd',
    },
    {
      name: 'St. Mary Medical Center',
      distance: '3.8 km',
      contact: '912',
      available: true,
      waitTime: '5-10 min',
      address: '456 Healthcare Ave',
    },
  ];

  const handleSearch = () => {
    // Navigate to search page with query parameter
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          background: 'linear-gradient(135deg, #0A2342 0%, #2D6E7E 100%)', 
          color: 'white',
          pt: { xs: 8, md: 10 },
          pb: { xs: 8, md: 12 },
          overflow: 'hidden'
        }}
      >
        {/* Background pattern - subtle grid */}
        <Box sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Typography 
                  variant="h1" 
                  component="h1" 
                  gutterBottom
                  sx={{
                    fontSize: { xs: '2.2rem', md: '3rem' },
                    fontWeight: 700,
                    color: 'white',
                    lineHeight: 1.2,
                    mb: 2
                  }}
                >
                  Your Health, Our Priority
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 3, 
                    opacity: 0.9,
                    maxWidth: '90%',
                    lineHeight: 1.5,
                    fontSize: { xs: '1rem', md: '1.1rem' }
                  }}
                >
                  Advanced healthcare solutions with a personal touch. Experience the future of medical care today.
                </Typography>
                <Button 
                  variant="contained" 
                  size="large"
                  component={Link}
                  to="/appointments"
                  sx={{ 
                    py: 1.5, 
                    px: 4, 
                    fontSize: '1.1rem',
                    backgroundColor: '#2D6E7E',
                    '&:hover': {
                      backgroundColor: '#1D4E5A',
                    }
                  }}
                >
                  Book Appointment
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 2
                }}
              >
                {/* Professional Medical Logo */}
                <Box sx={{ 
                  position: 'relative', 
                  width: '100%', 
                  maxWidth: 320, 
                  height: 320,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  {/* Main circle */}
                  <Box sx={{ 
                    position: 'absolute',
                    width: '70%',
                    height: '70%',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                  }}>
                    {/* Medical Cross Symbol */}
                    <Box sx={{ 
                      position: 'relative',
                      width: '60%',
                      height: '60%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      {/* Heartbeat Line */}
                      <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: 'absolute' }}>
                        <path 
                          d="M10,50 L30,50 L40,30 L50,70 L60,30 L70,50 L90,50" 
                          fill="none" 
                          stroke="#2D6E7E" 
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      
                      {/* Medical Cross */}
                      <Box sx={{ 
                        position: 'absolute',
                        width: '60%',
                        height: '60%',
                        opacity: 0.15
                      }}>
                        {/* Vertical */}
                        <Box sx={{ 
                          position: 'absolute',
                          top: '20%',
                          left: '42.5%',
                          width: '15%',
                          height: '60%',
                          backgroundColor: '#0A2342',
                          borderRadius: 1
                        }} />
                        
                        {/* Horizontal */}
                        <Box sx={{ 
                          position: 'absolute',
                          top: '42.5%',
                          left: '20%',
                          width: '60%',
                          height: '15%',
                          backgroundColor: '#0A2342',
                          borderRadius: 1
                        }} />
                      </Box>
                    </Box>
                  </Box>
                  
                  {/* Outer ring */}
                  <Box sx={{ 
                    position: 'absolute',
                    width: '85%',
                    height: '85%',
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.7)',
                    boxShadow: '0 0 20px rgba(255,255,255,0.2)'
                  }} />
                  
                  {/* Text "MedAssist" */}
                  <Box sx={{
                    position: 'absolute',
                    bottom: '15%',
                    textAlign: 'center',
                    width: '100%'
                  }}>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: 'white', 
                        fontWeight: 700,
                        letterSpacing: 1,
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      MedAssist
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        color: 'white', 
                        opacity: 0.9,
                        letterSpacing: 3,
                        textTransform: 'uppercase',
                        fontSize: '0.8rem',
                        fontWeight: 500
                      }}
                    >
                      Healthcare
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ mb: 5 }}
          >
            Our Services
          </Typography>
          <Grid container spacing={3}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'all 0.25s ease',
                    borderRadius: 1.5,
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.04)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.06)',
                      '& .icon-container': {
                        backgroundColor: '#0A2342',
                        transform: 'scale(1.05)',
                      }
                    }
                  }}
                >
                  <Box 
                    className="icon-container"
                    sx={{ 
                      backgroundColor: '#2D6E7E',
                      color: 'white',
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mt: 2.5,
                      mb: 1.5,
                      transition: 'all 0.3s ease',
                      boxShadow: '0 3px 6px rgba(0,0,0,0.08)'
                    }}
                  >
                    {React.cloneElement(service.icon, { style: { fontSize: '22px' }, className: "icon" })}
                  </Box>
                  <CardContent sx={{ textAlign: 'center', flexGrow: 1, px: 2, pb: 1.5, pt: 0.5 }}>
                    <Typography variant="h6" gutterBottom fontWeight="600" sx={{ mb: 1, fontSize: '1.1rem' }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: '0.875rem' }}>
                      {service.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0, pb: 2 }}>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      size="small"
                      endIcon={<ArrowForward sx={{ fontSize: '0.9rem' }} />}
                      onClick={() => navigate(service.path)}
                      sx={{ 
                        borderRadius: 1.5,
                        py: 0.6,
                        fontSize: '0.85rem',
                        borderColor: '#2D6E7E',
                        color: '#2D6E7E',
                        '&:hover': {
                          borderColor: '#1D4E5A',
                          backgroundColor: 'rgba(45, 110, 126, 0.04)',
                        }
                      }}
                    >
                      {service.action}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Top Doctors Section */}
      <Box sx={{ bgcolor: 'background.light', py: 8 }}>
        <Container>
          <Typography variant="h2" gutterBottom align="center" sx={{ mb: 4 }}>
            Top Rated Doctors
          </Typography>
          <Grid container spacing={4}>
            {doctors.map((doctor, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <DoctorCard elevation={2}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={doctor.image}
                        sx={{ width: 80, height: 80, mr: 2 }}
                        className="doctor-image"
                      />
                      <Box>
                        <Typography variant="h6" fontWeight="600">{doctor.name}</Typography>
                        <Typography color="text.secondary" gutterBottom>
                          {doctor.specialty}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Star sx={{ color: theme.palette.accent.main, mr: 0.5 }} />
                          <Typography variant="body2" fontWeight="500">{doctor.rating}</Typography>
                          <Typography variant="body2" sx={{ mx: 1 }}>•</Typography>
                          <Typography variant="body2">{doctor.experience}</Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Chip 
                        label={doctor.availability} 
                        color="success" 
                        size="small" 
                        sx={{ borderRadius: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        <CalendarMonth sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
                        Next available: Today
                      </Typography>
                    </Box>
                    <Button 
                      variant="contained" 
                      fullWidth
                      onClick={() => navigate(`/appointments?doctor=${encodeURIComponent(doctor.name)}`)}
                      sx={{ borderRadius: 2 }}
                    >
                      Book Appointment
                    </Button>
                  </CardContent>
                </DoctorCard>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button 
              variant="outlined" 
              endIcon={<ArrowForward />}
              size="large"
              onClick={() => navigate('/doctors')}
              sx={{ borderRadius: 2 }}
            >
              View All Doctors
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Emergency Services Section */}
      <Container sx={{ my: 8 }}>
        <Typography variant="h2" gutterBottom align="center" sx={{ mb: 1, color: theme.palette.error.main }}>
          Emergency Services
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
          Immediate medical attention when you need it most
        </Typography>
        <Grid container spacing={4}>
          {emergencyServices.map((service, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <EmergencyCard elevation={2} available={service.available}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom fontWeight="600">
                    {service.name}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOn sx={{ mr: 1, color: theme.palette.text.secondary }} />
                      <Typography variant="body2">{service.distance}</Typography>
                    </Box>
                    <Chip 
                      label={service.available ? 'Available Now' : 'Currently Full'} 
                      color={service.available ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {service.address}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTime sx={{ mr: 1, color: theme.palette.text.secondary }} />
                      <Typography variant="body2">Wait time: {service.waitTime}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Phone sx={{ mr: 1, color: theme.palette.text.secondary }} />
                      <Typography variant="body2">{service.contact}</Typography>
                    </Box>
                  </Box>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        color={service.available ? 'success' : 'error'}
                        fullWidth
                        onClick={() => window.location.href = `tel:${service.contact}`}
                        sx={{ borderRadius: 2 }}
                      >
                        Call Now
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        color={service.available ? 'success' : 'error'}
                        fullWidth
                        onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(service.address)}`, '_blank')}
                        sx={{ borderRadius: 2 }}
                      >
                        Get Directions
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </EmergencyCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Download App Section */}
      <Box sx={{ 
        background: `linear-gradient(45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.secondary.main} 90%)`,
        color: 'white', 
        py: 8 
      }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom>
                Get the MediCare App
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Book appointments, order medicines, and consult doctors - all from your phone
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => window.open('https://apps.apple.com', '_blank')}
                  sx={{ 
                    borderRadius: 2,
                    backgroundColor: 'white',
                    color: theme.palette.secondary.main,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    }
                  }}
                >
                  Download for iOS
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => window.open('https://play.google.com', '_blank')}
                  sx={{ 
                    borderRadius: 2,
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    }
                  }}
                >
                  Download for Android
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src="/images/app-preview.png"
                  alt="Mobile App"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
