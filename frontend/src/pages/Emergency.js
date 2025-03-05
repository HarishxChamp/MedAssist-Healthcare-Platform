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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@mui/material';
import {
  Search,
  LocalHospital,
  Phone,
  DirectionsCar,
  LocationOn,
  Warning,
  LocalPharmacy,
  AccessTime,
  MedicalServices,
  LocalParking,
  Bed,
  MedicalInformation,
} from '@mui/icons-material';

const hospitals = [
  {
    id: 1,
    name: 'City General Hospital',
    type: 'Multi-Specialty',
    address: '123 Healthcare Ave, Downtown',
    distance: '2.5 km',
    phone: '+1 234-567-8900',
    emergency: true,
    ambulance: true,
    beds: 12,
    waitTime: '10 mins',
    image: 'https://via.placeholder.com/100',
    specialties: ['Emergency Care', '24/7 Trauma Center', 'ICU'],
  },
  {
    id: 2,
    name: 'Metro Medical Center',
    type: 'General Hospital',
    address: '456 Medical Blvd, Uptown',
    distance: '3.8 km',
    phone: '+1 234-567-8901',
    emergency: true,
    ambulance: true,
    beds: 8,
    waitTime: '15 mins',
    image: 'https://via.placeholder.com/100',
    specialties: ['Emergency Care', 'Cardiac Center', 'Pediatric Emergency'],
  },
  {
    id: 3,
    name: 'LifeCare Hospital',
    type: 'Specialty Hospital',
    address: '789 Health Street, Midtown',
    distance: '4.2 km',
    phone: '+1 234-567-8902',
    emergency: true,
    ambulance: true,
    beds: 15,
    waitTime: '5 mins',
    image: 'https://via.placeholder.com/100',
    specialties: ['Emergency Care', 'Stroke Center', 'Critical Care'],
  },
];

const emergencyContacts = [
  { name: 'Emergency Services', number: '911', icon: <MedicalInformation /> },
  { name: 'Ambulance', number: '102', icon: <DirectionsCar /> },
  { name: 'Blood Bank', number: '104', icon: <LocalPharmacy /> },
  { name: '24/7 Pharmacy', number: '105', icon: <LocalPharmacy /> },
];

const Emergency = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCallAmbulance = (hospital) => {
    setSelectedHospital(hospital);
    setDialogOpen(true);
  };

  const EmergencyDialog = () => (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ bgcolor: 'error.main', color: 'white' }}>
        Emergency Assistance
      </DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="h6" gutterBottom>
            {selectedHospital?.name}
          </Typography>
          <Typography variant="body1" paragraph>
            An ambulance will be dispatched to your location immediately.
            Please stay on the line and provide the following information:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <LocationOn color="error" />
              </ListItemIcon>
              <ListItemText
                primary="Your Location"
                secondary="Please confirm your exact location"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Warning color="error" />
              </ListItemIcon>
              <ListItemText
                primary="Nature of Emergency"
                secondary="Brief description of the medical emergency"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Phone color="error" />
              </ListItemIcon>
              <ListItemText
                primary="Contact Number"
                secondary="A number where we can reach you"
              />
            </ListItem>
          </List>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<Phone />}
          onClick={() => {
            window.location.href = `tel:${selectedHospital?.phone}`;
          }}
        >
          Call Now
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ py: 4 }}>
      <Container>
        {/* Emergency Header */}
        <Box sx={{
          bgcolor: 'error.main',
          color: 'white',
          p: 3,
          borderRadius: 2,
          mb: 4,
        }}>
          <Typography variant="h4" gutterBottom>
            <MedicalInformation sx={{ mr: 1, fontSize: 35 }} />
            Emergency Services
          </Typography>
          <Typography variant="body1">
            Find nearest hospitals and emergency services. For immediate assistance, call 911.
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {emergencyContacts.map((contact) => (
              <Grid item xs={6} sm={3} key={contact.name}>
                <Button
                  variant="contained"
                  color="inherit"
                  fullWidth
                  startIcon={contact.icon}
                  onClick={() => {
                    window.location.href = `tel:${contact.number}`;
                  }}
                  sx={{ color: 'error.main' }}
                >
                  {contact.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Search */}
        <TextField
          fullWidth
          placeholder="Search nearby hospitals..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        {/* Hospitals List */}
        <Grid container spacing={3}>
          {hospitals.map((hospital) => (
            <Grid item xs={12} md={6} key={hospital.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Avatar
                      src={hospital.image}
                      variant="rounded"
                      sx={{ width: 80, height: 80 }}
                    />
                    <Box>
                      <Typography variant="h6">
                        {hospital.name}
                      </Typography>
                      <Typography color="text.secondary" gutterBottom>
                        {hospital.type}
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOn fontSize="small" color="action" />
                        {hospital.address}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        {hospital.distance} away
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    {hospital.specialties.map((specialty) => (
                      <Chip
                        key={specialty}
                        label={specialty}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                    <Chip
                      icon={<LocalHospital />}
                      label={`${hospital.beds} beds available`}
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      icon={<AccessTime />}
                      label={`Wait time: ${hospital.waitTime}`}
                      color="success"
                      variant="outlined"
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DirectionsCar />}
                      fullWidth
                      onClick={() => handleCallAmbulance(hospital)}
                    >
                      Call Ambulance
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<LocationOn />}
                      fullWidth
                      onClick={() => {
                        window.open(`https://maps.google.com?q=${hospital.address}`);
                      }}
                    >
                      Get Directions
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <EmergencyDialog />
      </Container>
    </Box>
  );
};

export default Emergency;
