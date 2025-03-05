import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Rating,
} from '@mui/material';
import {
  Person,
  CalendarMonth,
  VideoCall,
  Assignment,
  AccessTime,
  Edit,
  Check,
  Close,
  LocalHospital,
  Star,
  TrendingUp,
  AttachMoney,
  People,
  Add,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const DoctorDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [prescriptionDialog, setPrescriptionDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [medications, setMedications] = useState([
    { name: '', dosage: '', frequency: '', duration: '' },
    { name: '', dosage: '', frequency: '', duration: '' }
  ]);

  const stats = [
    {
      title: 'Total Patients',
      value: '1,234',
      icon: <People color="primary" sx={{ fontSize: 40 }} />,
      trend: '+12%',
    },
    {
      title: "Today's Appointments",
      value: '8',
      icon: <CalendarMonth color="primary" sx={{ fontSize: 40 }} />,
      trend: '+2',
    },
    {
      title: 'Revenue',
      value: '$12,345',
      icon: <AttachMoney color="primary" sx={{ fontSize: 40 }} />,
      trend: '+8%',
    },
    {
      title: 'Rating',
      value: '4.8',
      icon: <Star color="primary" sx={{ fontSize: 40 }} />,
      trend: '+0.2',
    },
  ];

  const appointments = [
    {
      id: 1,
      patient: 'John Doe',
      time: '10:00 AM',
      type: 'Video Consultation',
      status: 'Upcoming',
      symptoms: 'Fever, Headache',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      patient: 'Jane Smith',
      time: '11:30 AM',
      type: 'In-person',
      status: 'Checked-in',
      symptoms: 'Back pain',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  ];

  const patients = [
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      lastVisit: '2025-03-01',
      condition: 'Hypertension',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 32,
      lastVisit: '2025-02-28',
      condition: 'Diabetes',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  ];

  const handlePrescribe = (appointment) => {
    setSelectedAppointment(appointment);
    setPrescriptionDialog(true);
  };

  const handleAddMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...medications];
    updatedMedications[index][field] = value;
    setMedications(updatedMedications);
  };

  const PrescriptionDialog = () => (
    <Dialog
      open={prescriptionDialog}
      onClose={() => setPrescriptionDialog(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Write Prescription</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Patient: {selectedAppointment?.patient}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            Symptoms: {selectedAppointment?.symptoms}
          </Typography>
          
          <TextField
            fullWidth
            label="Diagnosis"
            multiline
            rows={2}
            margin="normal"
          />
          
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Medications
          </Typography>
          
          {medications.map((medication, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Medicine Name"
                  size="small"
                  value={medication.name}
                  onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  label="Dosage"
                  size="small"
                  value={medication.dosage}
                  onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Frequency"
                  size="small"
                  value={medication.frequency}
                  onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Duration"
                  size="small"
                  value={medication.duration}
                  onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                />
              </Grid>
            </Grid>
          ))}
          
          <Button
            variant="outlined"
            sx={{ mt: 1 }}
            onClick={handleAddMedication}
            startIcon={<Add />}
          >
            Add Medicine
          </Button>
          
          <TextField
            fullWidth
            label="Additional Notes"
            multiline
            rows={3}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Follow-up Instructions"
            multiline
            rows={2}
            margin="normal"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setPrescriptionDialog(false)}>Cancel</Button>
        <Button variant="contained" onClick={() => setPrescriptionDialog(false)}>
          Save & Send
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ py: 4 }}>
      <Container>
        {/* Doctor Info */}
        <Paper sx={{ p: 3, mb: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar
            src="https://randomuser.me/api/portraits/men/32.jpg"
            sx={{ width: 100, height: 100 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              Dr. Michael Chen
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Neurologist • Metro Hospital
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Chip
                icon={<Star />}
                label="4.8 Rating"
                sx={{ mr: 1 }}
              />
              <Chip
                icon={<Person />}
                label="1,234 Patients"
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<Edit />}
          >
            Edit Profile
          </Button>
        </Paper>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {stat.icon}
                    <Chip
                      label={stat.trend}
                      color="success"
                      size="small"
                      icon={<TrendingUp />}
                    />
                  </Box>
                  <Typography variant="h4" sx={{ my: 2 }}>
                    {stat.value}
                  </Typography>
                  <Typography color="text.secondary">
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Main Content */}
        <Paper sx={{ width: '100%' }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<CalendarMonth />} label="Appointments" />
            <Tab icon={<Person />} label="Patients" />
            <Tab icon={<Assignment />} label="Medical Records" />
            <Tab icon={<VideoCall />} label="Consultations" />
          </Tabs>

          {/* Appointments Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Box>

            <List>
              {appointments.map((appointment) => (
                <Paper sx={{ mb: 2 }} key={appointment.id}>
                  <ListItem
                    secondaryAction={
                      <Box>
                        <IconButton color="primary" onClick={() => handlePrescribe(appointment)}>
                          <Assignment />
                        </IconButton>
                        <IconButton color="success">
                          <Check />
                        </IconButton>
                        <IconButton color="error">
                          <Close />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar src={appointment.image} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {appointment.patient}
                          <Chip
                            size="small"
                            label={appointment.status}
                            color={appointment.status === 'Upcoming' ? 'primary' : 'success'}
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {appointment.time} • {appointment.type}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            Symptoms: {appointment.symptoms}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </Paper>
              ))}
            </List>
          </TabPanel>

          {/* Patients Tab */}
          <TabPanel value={tabValue} index={1}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Patient</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Last Visit</TableCell>
                    <TableCell>Condition</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar src={patient.image} />
                          {patient.name}
                        </Box>
                      </TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.lastVisit}</TableCell>
                      <TableCell>{patient.condition}</TableCell>
                      <TableCell>
                        <IconButton color="primary">
                          <Assignment />
                        </IconButton>
                        <IconButton color="primary">
                          <Edit />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Medical Records Tab */}
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" gutterBottom>
              Medical Records
            </Typography>
            <Typography color="text.secondary">
              Access and manage patient medical records
            </Typography>
          </TabPanel>

          {/* Consultations Tab */}
          <TabPanel value={tabValue} index={3}>
            <Typography variant="h6" gutterBottom>
              Video Consultations
            </Typography>
            <Typography color="text.secondary">
              Manage your upcoming and past video consultations
            </Typography>
          </TabPanel>
        </Paper>
      </Container>
      {prescriptionDialog && <PrescriptionDialog />}
    </Box>
  );
};

export default DoctorDashboard;
