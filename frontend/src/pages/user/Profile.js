import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondary,
  Divider,
  Chip,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Person,
  Edit,
  LocalHospital,
  Assignment,
  Receipt,
  Medication,
  Science,
  CalendarMonth,
  Notifications,
  Settings,
  Upload,
  Download,
  Share,
  Lock,
} from '@mui/icons-material';

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

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editField, setEditField] = useState({ name: '', value: '' });

  const handleEditClick = (name, value) => {
    setEditField({ name, value });
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    // Save edited value
    setEditDialogOpen(false);
  };

  const userInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234-567-8900',
    bloodGroup: 'O+',
    age: 32,
    gender: 'Male',
    address: '123 Medical Street, Healthcare City, 12345',
    emergencyContact: 'Jane Doe (+1 234-567-8901)',
  };

  const medicalHistory = {
    allergies: ['Penicillin', 'Pollen'],
    conditions: ['Hypertension', 'Diabetes Type 2'],
    medications: ['Metformin 500mg', 'Lisinopril 10mg'],
    surgeries: ['Appendectomy (2018)'],
  };

  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      date: '2025-03-05',
      time: '10:00 AM',
      type: 'Video Consultation',
      status: 'Upcoming',
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      date: '2025-03-01',
      time: '2:30 PM',
      type: 'In-person',
      status: 'Completed',
    },
  ];

  const prescriptions = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      date: '2025-03-01',
      medicines: ['Medicine A', 'Medicine B'],
      duration: '7 days',
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      date: '2025-02-28',
      medicines: ['Medicine C'],
      duration: '30 days',
    },
  ];

  const reports = [
    {
      id: 1,
      name: 'Blood Test Report',
      date: '2025-03-01',
      type: 'Laboratory',
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'X-Ray Report',
      date: '2025-02-28',
      type: 'Radiology',
      size: '5.1 MB',
    },
  ];

  const EditDialog = () => (
    <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
      <DialogTitle>Edit {editField.name}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          value={editField.value}
          onChange={(e) => setEditField({ ...editField, value: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
        <Button onClick={handleEditSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ py: 4 }}>
      <Container>
        <Grid container spacing={3}>
          {/* Profile Summary */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar
                src="/path-to-profile-pic.jpg"
                sx={{ width: 100, height: 100 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  {userInfo.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {userInfo.email} • {userInfo.phone}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip
                    icon={<LocalHospital />}
                    label={`Blood Group: ${userInfo.bloodGroup}`}
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    icon={<Assignment />}
                    label={`Patient ID: MED123456`}
                  />
                </Box>
              </Box>
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => handleEditClick('Profile', userInfo)}
              >
                Edit Profile
              </Button>
            </Paper>
          </Grid>

          {/* Tabs Section */}
          <Grid item xs={12}>
            <Paper sx={{ width: '100%' }}>
              <Tabs
                value={tabValue}
                onChange={(e, newValue) => setTabValue(newValue)}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab icon={<Person />} label="Personal Info" />
                <Tab icon={<LocalHospital />} label="Medical History" />
                <Tab icon={<CalendarMonth />} label="Appointments" />
                <Tab icon={<Receipt />} label="Prescriptions" />
                <Tab icon={<Assignment />} label="Reports" />
                <Tab icon={<Settings />} label="Settings" />
              </Tabs>

              {/* Personal Info Tab */}
              <TabPanel value={tabValue} index={0}>
                <List>
                  {Object.entries(userInfo).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <ListItem
                        secondaryAction={
                          <IconButton edge="end" onClick={() => handleEditClick(key, value)}>
                            <Edit />
                          </IconButton>
                        }
                      >
                        <ListItemText
                          primary={key.charAt(0).toUpperCase() + key.slice(1)}
                          secondary={value}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </TabPanel>

              {/* Medical History Tab */}
              <TabPanel value={tabValue} index={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Allergies
                        </Typography>
                        {medicalHistory.allergies.map((allergy) => (
                          <Chip
                            key={allergy}
                            label={allergy}
                            sx={{ m: 0.5 }}
                          />
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Chronic Conditions
                        </Typography>
                        {medicalHistory.conditions.map((condition) => (
                          <Chip
                            key={condition}
                            label={condition}
                            sx={{ m: 0.5 }}
                          />
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Current Medications
                        </Typography>
                        {medicalHistory.medications.map((medication) => (
                          <Chip
                            key={medication}
                            icon={<Medication />}
                            label={medication}
                            sx={{ m: 0.5 }}
                          />
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Appointments Tab */}
              <TabPanel value={tabValue} index={2}>
                <Grid container spacing={2}>
                  {appointments.map((appointment) => (
                    <Grid item xs={12} md={6} key={appointment.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {appointment.doctor}
                          </Typography>
                          <Typography color="text.secondary">
                            {appointment.date} at {appointment.time}
                          </Typography>
                          <Typography color="text.secondary">
                            {appointment.type}
                          </Typography>
                          <Box sx={{ mt: 2 }}>
                            <Chip
                              label={appointment.status}
                              color={appointment.status === 'Upcoming' ? 'primary' : 'default'}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              {/* Prescriptions Tab */}
              <TabPanel value={tabValue} index={3}>
                <Grid container spacing={2}>
                  {prescriptions.map((prescription) => (
                    <Grid item xs={12} key={prescription.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {prescription.doctor}
                          </Typography>
                          <Typography color="text.secondary">
                            Date: {prescription.date}
                          </Typography>
                          <Typography color="text.secondary">
                            Duration: {prescription.duration}
                          </Typography>
                          <Box sx={{ mt: 2 }}>
                            {prescription.medicines.map((medicine) => (
                              <Chip
                                key={medicine}
                                label={medicine}
                                icon={<Medication />}
                                sx={{ m: 0.5 }}
                              />
                            ))}
                          </Box>
                          <Box sx={{ mt: 2 }}>
                            <Button
                              startIcon={<Download />}
                              variant="outlined"
                              size="small"
                            >
                              Download
                            </Button>
                            <Button
                              startIcon={<Share />}
                              variant="outlined"
                              size="small"
                              sx={{ ml: 1 }}
                            >
                              Share
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              {/* Reports Tab */}
              <TabPanel value={tabValue} index={4}>
                <Grid container spacing={2}>
                  {reports.map((report) => (
                    <Grid item xs={12} md={6} key={report.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {report.name}
                          </Typography>
                          <Typography color="text.secondary">
                            Date: {report.date}
                          </Typography>
                          <Typography color="text.secondary">
                            Type: {report.type}
                          </Typography>
                          <Typography color="text.secondary">
                            Size: {report.size}
                          </Typography>
                          <Box sx={{ mt: 2 }}>
                            <Button
                              startIcon={<Download />}
                              variant="outlined"
                              size="small"
                            >
                              Download
                            </Button>
                            <Button
                              startIcon={<Share />}
                              variant="outlined"
                              size="small"
                              sx={{ ml: 1 }}
                            >
                              Share
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              {/* Settings Tab */}
              <TabPanel value={tabValue} index={5}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Notifications />
                    </ListItemIcon>
                    <ListItemText
                      primary="Notification Preferences"
                      secondary="Manage your notification settings"
                    />
                    <Button variant="outlined">Manage</Button>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Lock />
                    </ListItemIcon>
                    <ListItemText
                      primary="Privacy Settings"
                      secondary="Control your privacy preferences"
                    />
                    <Button variant="outlined">Manage</Button>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Share />
                    </ListItemIcon>
                    <ListItemText
                      primary="Data Sharing"
                      secondary="Manage how your data is shared"
                    />
                    <Button variant="outlined">Manage</Button>
                  </ListItem>
                </List>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>

        <EditDialog />
      </Container>
    </Box>
  );
};

export default Profile;
