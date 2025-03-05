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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  Delete,
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

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [addDoctorDialog, setAddDoctorDialog] = useState(false);
  const [addDepartmentDialog, setAddDepartmentDialog] = useState(false);

  const stats = [
    {
      title: 'Total Patients',
      value: '12,345',
      icon: <People color="primary" sx={{ fontSize: 40 }} />,
      trend: '+15%',
    },
    {
      title: 'Total Doctors',
      value: '148',
      icon: <LocalHospital color="primary" sx={{ fontSize: 40 }} />,
      trend: '+5',
    },
    {
      title: 'Revenue',
      value: '$234,567',
      icon: <AttachMoney color="primary" sx={{ fontSize: 40 }} />,
      trend: '+12%',
    },
    {
      title: 'Occupancy Rate',
      value: '85%',
      icon: <TrendingUp color="primary" sx={{ fontSize: 40 }} />,
      trend: '+3%',
    },
  ];

  const departments = [
    {
      id: 1,
      name: 'Cardiology',
      head: 'Dr. Sarah Johnson',
      doctors: 15,
      patients: 234,
      revenue: '$45,678',
    },
    {
      id: 2,
      name: 'Neurology',
      head: 'Dr. Michael Chen',
      doctors: 12,
      patients: 189,
      revenue: '$38,912',
    },
    {
      id: 3,
      name: 'Pediatrics',
      head: 'Dr. Emily Williams',
      doctors: 18,
      patients: 312,
      revenue: '$52,345',
    },
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      patients: 234,
      rating: 4.8,
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      patients: 189,
      rating: 4.7,
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
  ];

  const facilities = [
    {
      id: 1,
      name: 'ICU',
      totalBeds: 20,
      occupied: 15,
      staff: 30,
      status: 'Operational',
    },
    {
      id: 2,
      name: 'Emergency',
      totalBeds: 15,
      occupied: 8,
      staff: 25,
      status: 'Operational',
    },
  ];

  const AddDoctorDialog = () => (
    <Dialog
      open={addDoctorDialog}
      onClose={() => setAddDoctorDialog(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Add New Doctor</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Specialty</InputLabel>
              <Select label="Specialty">
                <MenuItem value="cardiology">Cardiology</MenuItem>
                <MenuItem value="neurology">Neurology</MenuItem>
                <MenuItem value="pediatrics">Pediatrics</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Department</InputLabel>
              <Select label="Department">
                {departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Qualifications"
              multiline
              rows={2}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAddDoctorDialog(false)}>Cancel</Button>
        <Button variant="contained" onClick={() => setAddDoctorDialog(false)}>
          Add Doctor
        </Button>
      </DialogActions>
    </Dialog>
  );

  const AddDepartmentDialog = () => (
    <Dialog
      open={addDepartmentDialog}
      onClose={() => setAddDepartmentDialog(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add New Department</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Department Name"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Department Head</InputLabel>
              <Select label="Department Head">
                {doctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAddDepartmentDialog(false)}>Cancel</Button>
        <Button variant="contained" onClick={() => setAddDepartmentDialog(false)}>
          Add Department
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ py: 4 }}>
      <Container>
        {/* Header */}
        <Typography variant="h4" gutterBottom>
          Hospital Administration
        </Typography>

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
            <Tab icon={<LocalHospital />} label="Departments" />
            <Tab icon={<Person />} label="Doctors" />
            <Tab icon={<CalendarMonth />} label="Facilities" />
            <Tab icon={<Assignment />} label="Reports" />
          </Tabs>

          {/* Departments Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setAddDepartmentDialog(true)}
              >
                Add Department
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Department</TableCell>
                    <TableCell>Head</TableCell>
                    <TableCell>Doctors</TableCell>
                    <TableCell>Patients</TableCell>
                    <TableCell>Revenue</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {departments.map((department) => (
                    <TableRow key={department.id}>
                      <TableCell>{department.name}</TableCell>
                      <TableCell>{department.head}</TableCell>
                      <TableCell>{department.doctors}</TableCell>
                      <TableCell>{department.patients}</TableCell>
                      <TableCell>{department.revenue}</TableCell>
                      <TableCell>
                        <IconButton color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Doctors Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setAddDoctorDialog(true)}
              >
                Add Doctor
              </Button>
            </Box>

            <Grid container spacing={3}>
              {doctors.map((doctor) => (
                <Grid item xs={12} md={6} key={doctor.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Avatar
                          src={doctor.image}
                          sx={{ width: 80, height: 80 }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6">
                            {doctor.name}
                          </Typography>
                          <Typography color="text.secondary" gutterBottom>
                            {doctor.specialty}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip
                              icon={<Person />}
                              label={`${doctor.patients} Patients`}
                              size="small"
                            />
                            <Chip
                              icon={<Star />}
                              label={`${doctor.rating} Rating`}
                              size="small"
                            />
                          </Box>
                        </Box>
                        <Box>
                          <IconButton color="primary">
                            <Edit />
                          </IconButton>
                          <IconButton color="error">
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Facilities Tab */}
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              {facilities.map((facility) => (
                <Grid item xs={12} md={6} key={facility.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {facility.name}
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText
                            primary={`Total Beds: ${facility.totalBeds}`}
                            secondary={`Occupied: ${facility.occupied}`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={`Staff: ${facility.staff}`}
                            secondary={`Status: ${facility.status}`}
                          />
                        </ListItem>
                      </List>
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant="outlined"
                          startIcon={<Edit />}
                        >
                          Manage
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Reports Tab */}
          <TabPanel value={tabValue} index={3}>
            {/* Add Reports content */}
          </TabPanel>
        </Paper>

        <AddDoctorDialog />
        <AddDepartmentDialog />
      </Container>
    </Box>
  );
};

export default AdminDashboard;
