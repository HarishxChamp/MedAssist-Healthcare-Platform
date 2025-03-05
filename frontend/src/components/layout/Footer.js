import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Link as MuiLink, Divider, Button, useTheme, alpha, Paper } from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  YouTube,
  Email,
  Phone,
  LocationOn,
  MedicalInformation,
  ArrowForward,
  MedicalServices,
  LocalHospital,
  AccessTime,
  PrivacyTip,
  Gavel,
  Info,
  ContactSupport,
  Healing,
  VerifiedUser,
  Security,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const FooterLink = ({ to, children }) => (
  <MuiLink
    component={Link}
    to={to}
    sx={{
      color: 'text.secondary',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      mb: 1.5,
      '&:hover': {
        color: 'primary.main',
        transform: 'translateX(5px)',
        transition: 'all 0.3s ease',
      },
    }}
  >
    <ArrowForward sx={{ fontSize: 14, mr: 1 }} />
    {children}
  </MuiLink>
);

const Footer = () => {
  const theme = useTheme();
  
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
        position: 'relative',
        boxShadow: '0px -5px 20px rgba(0, 0, 0, 0.05)',
        borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  mb: 2,
                }}
              >
                <MedicalInformation sx={{ mr: 1 }} />
                MEDASSIST
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Your trusted healthcare partner providing comprehensive medical services, consultations, and support for all your health needs with the highest standards of care.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <LocationOn sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  123 Medical Plaza, Healthcare Avenue, City
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <Phone sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  +1 (800) MED-CARE
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <Email sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  contact@medassist.com
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                size="small" 
                sx={{ 
                  color: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                <Facebook fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                <Twitter fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                <Instagram fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                <LinkedIn fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                <YouTube fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Services
            </Typography>
            <FooterLink to="/doctors">Find Doctors</FooterLink>
            <FooterLink to="/appointments">Book Appointment</FooterLink>
            <FooterLink to="/video-consult">Video Consultation</FooterLink>
            <FooterLink to="/shop">Order Medicines</FooterLink>
            <FooterLink to="/lab-tests">Lab Tests</FooterLink>
            <FooterLink to="/emergency">Emergency Services</FooterLink>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              For Patients
            </Typography>
            <FooterLink to="/health-records">Health Records</FooterLink>
            <FooterLink to="/health-plans">Health Plans</FooterLink>
            <FooterLink to="/health-articles">Health Articles</FooterLink>
            <FooterLink to="/patient-stories">Patient Stories</FooterLink>
            <FooterLink to="/faq">FAQs</FooterLink>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              For Doctors
            </Typography>
            <FooterLink to="/doctor/register">Join as Doctor</FooterLink>
            <FooterLink to="/doctor/dashboard">Doctor Dashboard</FooterLink>
            <FooterLink to="/doctor/appointments">Manage Appointments</FooterLink>
            <FooterLink to="/doctor/patients">Patient Management</FooterLink>
            <FooterLink to="/doctor/resources">Medical Resources</FooterLink>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Company
            </Typography>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/careers">Careers</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' } }}>
          <Typography variant="body2" color="text.secondary">
            {new Date().getFullYear()} MEDASSIST. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3, mt: { xs: 2, md: 0 } }}>
            <MuiLink component={Link} to="/privacy-policy" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
              <PrivacyTip sx={{ fontSize: 16, mr: 0.5 }} />
              Privacy
            </MuiLink>
            <MuiLink component={Link} to="/terms" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
              <Gavel sx={{ fontSize: 16, mr: 0.5 }} />
              Terms
            </MuiLink>
            <MuiLink component={Link} to="/accessibility" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
              <Healing sx={{ fontSize: 16, mr: 0.5 }} />
              Accessibility
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
