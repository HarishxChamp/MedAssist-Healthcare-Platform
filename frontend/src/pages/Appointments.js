import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Paper,
  Divider,
  Avatar,
  styled,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  AccessTime,
  CalendarMonth,
  VideoCall,
  Person,
  CheckCircle,
  LocationOn,
} from '@mui/icons-material';

// Styled components for enhanced UI
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
  },
}));

const TimeSlotButton = styled(Button)(({ theme, selected }) => ({
  borderRadius: 12,
  padding: '10px 16px',
  transition: 'all 0.2s ease',
  backgroundColor: selected ? theme.palette.primary.main : 'transparent',
  color: selected ? '#fff' : theme.palette.primary.main,
  border: `1px solid ${selected ? 'transparent' : theme.palette.primary.main}`,
  '&:hover': {
    backgroundColor: selected ? theme.palette.primary.dark : 'rgba(74, 20, 140, 0.08)',
    transform: 'scale(1.05)',
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  backgroundColor: '#fff',
}));

const steps = ['Select Doctor', 'Choose Time', 'Patient Details', 'Confirmation'];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

const Appointments = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('in-person');
  const [symptoms, setSymptoms] = useState('');
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Submit appointment details to backend
    console.log({
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      symptoms,
      patientDetails,
    });
    handleNext();
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h5" gutterBottom color="primary" fontWeight="600">
              Selected Doctor
            </Typography>
            <StyledCard sx={{ mb: 3 }}>
              <CardContent>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} sm={2}>
                    <Avatar
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Doctor"
                      sx={{ width: 100, height: 100, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <Typography variant="h5" color="primary" fontWeight="600">Dr. Michael Chen</Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>Neurologist</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>15 years experience</strong> • Metro Neurology Center
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip
                        icon={<Person />}
                        label="In-person consultation: $120"
                        sx={{ 
                          borderRadius: '50px', 
                          backgroundColor: appointmentType === 'in-person' ? 'rgba(74, 20, 140, 0.1)' : 'transparent',
                          border: appointmentType === 'in-person' ? '1px solid #4A148C' : '1px solid #e0e0e0',
                          fontWeight: appointmentType === 'in-person' ? 600 : 400
                        }}
                      />
                      <Chip
                        icon={<VideoCall />}
                        label="Video consultation: $80"
                        sx={{ 
                          borderRadius: '50px', 
                          backgroundColor: appointmentType === 'video' ? 'rgba(74, 20, 140, 0.1)' : 'transparent',
                          border: appointmentType === 'video' ? '1px solid #4A148C' : '1px solid #e0e0e0',
                          fontWeight: appointmentType === 'video' ? 600 : 400
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom color="primary">
                  Select Appointment Type
                </Typography>
                <RadioGroup
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                  sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
                >
                  <FormControlLabel
                    value="in-person"
                    control={<Radio color="primary" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOn sx={{ mr: 1 }} />
                        <Typography>In-person Consultation</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="video"
                    control={<Radio color="primary" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <VideoCall sx={{ mr: 1 }} />
                        <Typography>Video Consultation</Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </CardContent>
            </StyledCard>
          </Box>
        );

      case 1:
        return (
          <StyledPaper elevation={0}>
            <Typography variant="h5" gutterBottom color="primary" fontWeight="600">
              Select Date & Time
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Select Date"
                    value={selectedDate}
                    onChange={(newDate) => setSelectedDate(newDate)}
                    slotProps={{ 
                      textField: { 
                        fullWidth: true,
                        variant: "outlined",
                        helperText: "Choose your preferred date for the appointment"
                      } 
                    }}
                    disablePast
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
            <Typography variant="h6" sx={{ mt: 4, mb: 2 }} color="primary">
              Available Time Slots
            </Typography>
            <Grid container spacing={2}>
              {timeSlots.map((time) => (
                <Grid item xs={6} sm={4} md={3} key={time}>
                  <TimeSlotButton
                    selected={selectedTime === time}
                    fullWidth
                    onClick={() => setSelectedTime(time)}
                    startIcon={<AccessTime />}
                  >
                    {time}
                  </TimeSlotButton>
                </Grid>
              ))}
            </Grid>
          </StyledPaper>
        );

      case 2:
        return (
          <StyledPaper elevation={0}>
            <Typography variant="h5" gutterBottom color="primary" fontWeight="600">
              Patient Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Patient Name"
                  value={patientDetails.name}
                  onChange={(e) =>
                    setPatientDetails({ ...patientDetails, name: e.target.value })
                  }
                  variant="outlined"
                  placeholder="Enter full name"
                  helperText="As it appears on your ID"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Age"
                  type="number"
                  value={patientDetails.age}
                  onChange={(e) =>
                    setPatientDetails({ ...patientDetails, age: e.target.value })
                  }
                  variant="outlined"
                  InputProps={{ inputProps: { min: 0, max: 120 } }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={patientDetails.gender}
                    label="Gender"
                    onChange={(e) =>
                      setPatientDetails({ ...patientDetails, gender: e.target.value })
                    }
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={patientDetails.phone}
                  onChange={(e) =>
                    setPatientDetails({ ...patientDetails, phone: e.target.value })
                  }
                  variant="outlined"
                  placeholder="e.g., +1 (555) 123-4567"
                  helperText="We'll send appointment reminders to this number"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={patientDetails.email}
                  onChange={(e) =>
                    setPatientDetails({ ...patientDetails, email: e.target.value })
                  }
                  variant="outlined"
                  placeholder="your.email@example.com"
                  helperText="For appointment confirmation and updates"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Symptoms & Notes"
                  multiline
                  rows={4}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Please describe your symptoms and any relevant medical history..."
                  variant="outlined"
                  helperText="This information helps the doctor prepare for your visit"
                />
              </Grid>
            </Grid>
          </StyledPaper>
        );

      case 3:
        return (
          <StyledPaper elevation={0} sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircle color="primary" sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h4" color="primary" gutterBottom fontWeight="bold">
              Appointment Confirmed!
            </Typography>
            <Typography variant="body1" paragraph fontSize="18px">
              Your appointment has been scheduled with Dr. Michael Chen
            </Typography>
            <Box sx={{ 
              my: 4, 
              p: 3, 
              borderRadius: 2, 
              backgroundColor: 'rgba(74, 20, 140, 0.05)', 
              display: 'inline-block',
              minWidth: '300px'
            }}>
              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <CalendarMonth sx={{ mr: 1, color: 'primary.main' }} />
                <strong>Date:</strong> {selectedDate?.toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <AccessTime sx={{ mr: 1, color: 'primary.main' }} />
                <strong>Time:</strong> {selectedTime}
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                {appointmentType === 'video' ? 
                  <VideoCall sx={{ mr: 1, color: 'primary.main' }} /> : 
                  <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
                }
                <strong>Type:</strong> {appointmentType === 'video' ? 'Video Consultation' : 'In-person Visit'}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              A confirmation email has been sent to <strong>{patientDetails.email}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You will receive a reminder 24 hours before your appointment
            </Typography>
          </StyledPaper>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ py: 5, backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom color="primary" fontWeight="600" align="center">
          Book Your Appointment
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 5 }}>
          Complete the steps below to schedule your consultation with our specialists
        </Typography>
        
        <StyledPaper elevation={0} sx={{ mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ py: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </StyledPaper>
        
        <Box sx={{ mt: 4 }}>
          {renderStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            {activeStep > 0 && (
              <Button 
                onClick={handleBack} 
                sx={{ mr: 1 }}
                variant="outlined"
              >
                Back
              </Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                component={Link}
                to="/appointments/my-appointments"
                size="large"
                startIcon={<CalendarMonth />}
              >
                View My Appointments
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={activeStep === steps.length - 2 ? handleSubmit : handleNext}
                size="large"
              >
                {activeStep === steps.length - 2 ? 'Book Appointment' : 'Next'}
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Appointments;
