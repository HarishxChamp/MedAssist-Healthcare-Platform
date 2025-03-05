import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Container,
  Grid,
  useTheme,
  alpha,
  styled
} from '@mui/material';
import { 
  HealthAndSafety, 
  ArrowForward,
  LocalHospital,
  MedicalServices,
  Medication
} from '@mui/icons-material';

const BannerWrapper = styled(Paper)(({ theme, bgColor }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 16,
  padding: theme.spacing(4, 3),
  backgroundColor: bgColor || theme.palette.primary.main,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '40%',
    height: '100%',
    backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
    zIndex: 0
  }
}));

const IconCircle = styled(Box)(({ theme, bgColor }) => ({
  width: 64,
  height: 64,
  borderRadius: '50%',
  backgroundColor: alpha('#fff', 0.15),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  color: '#fff',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
}));

const MedicalBanner = ({
  title,
  subtitle,
  description,
  buttonText,
  buttonLink,
  icon = 'health',
  color,
  variant = 'primary',
  align = 'left',
  fullWidth = false
}) => {
  const theme = useTheme();
  
  // Determine background color based on variant
  const getBgColor = () => {
    switch (variant) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'info':
        return theme.palette.info.main;
      case 'success':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'error':
        return theme.palette.error.main;
      case 'accent':
        return theme.palette.accent?.main || '#4CAF50';
      default:
        return color || theme.palette.primary.main;
    }
  };
  
  // Map icon name to component
  const iconMap = {
    health: <HealthAndSafety sx={{ fontSize: 32 }} />,
    hospital: <LocalHospital sx={{ fontSize: 32 }} />,
    services: <MedicalServices sx={{ fontSize: 32 }} />,
    medication: <Medication sx={{ fontSize: 32 }} />
  };
  
  const selectedIcon = iconMap[icon] || iconMap.health;
  
  return (
    <Container maxWidth={fullWidth ? false : 'lg'} disableGutters={fullWidth} sx={{ mb: 4 }}>
      <BannerWrapper bgColor={getBgColor()}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={align === 'center' ? 12 : 8} 
            sx={{ 
              textAlign: align,
              ...(align === 'center' && { 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center' 
              })
            }}
          >
            <IconCircle>
              {selectedIcon}
            </IconCircle>
            
            <Typography 
              variant="h4" 
              component="h2" 
              color="white" 
              fontWeight={700} 
              gutterBottom
            >
              {title}
            </Typography>
            
            {subtitle && (
              <Typography 
                variant="h6" 
                color="white" 
                fontWeight={600} 
                gutterBottom
                sx={{ opacity: 0.9 }}
              >
                {subtitle}
              </Typography>
            )}
            
            {description && (
              <Typography 
                variant="body1" 
                color="white" 
                paragraph 
                sx={{ 
                  opacity: 0.8,
                  maxWidth: align === 'center' ? '700px' : 'none',
                  mb: buttonText ? 3 : 0
                }}
              >
                {description}
              </Typography>
            )}
            
            {buttonText && (
              <Button 
                variant="contained" 
                color="inherit"
                endIcon={<ArrowForward />}
                sx={{ 
                  backgroundColor: 'white',
                  color: getBgColor(),
                  '&:hover': {
                    backgroundColor: alpha('white', 0.9)
                  },
                  fontWeight: 600,
                  px: 3
                }}
                href={buttonLink}
              >
                {buttonText}
              </Button>
            )}
          </Grid>
          
          {align !== 'center' && (
            <Grid item xs={12} md={4} sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ 
                position: 'relative', 
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {/* This space can be used for an image or additional content */}
              </Box>
            </Grid>
          )}
        </Grid>
      </BannerWrapper>
    </Container>
  );
};

export default MedicalBanner;
