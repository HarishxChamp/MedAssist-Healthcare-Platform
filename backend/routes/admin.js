const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET api/admin/dashboard
// @desc    Get admin dashboard data
// @access  Private (admin only)
router.get('/dashboard', auth, async (req, res) => {
  try {
    // In a real app, you would fetch from database and check if user is admin
    // This is a placeholder response
    const dashboardData = {
      stats: {
        totalDoctors: 45,
        totalPatients: 1250,
        totalAppointments: 320,
        revenue: 45600
      },
      recentDoctors: [
        {
          id: 1,
          name: 'Dr. Michael Chen',
          specialty: 'Neurologist',
          hospital: 'Metro Hospital',
          joined: '2025-02-15',
          image: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
          id: 2,
          name: 'Dr. Sarah Johnson',
          specialty: 'Cardiologist',
          hospital: 'City General Hospital',
          joined: '2025-02-20',
          image: 'https://randomuser.me/api/portraits/women/44.jpg'
        }
      ],
      recentPatients: [
        {
          id: 1,
          name: 'John Doe',
          age: 45,
          registered: '2025-03-01',
          image: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        {
          id: 2,
          name: 'Jane Smith',
          age: 32,
          registered: '2025-02-28',
          image: 'https://randomuser.me/api/portraits/women/2.jpg'
        }
      ],
      appointmentsOverview: {
        total: 320,
        completed: 180,
        upcoming: 120,
        cancelled: 20
      }
    };
    
    res.json(dashboardData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/hospitals
// @desc    Get all hospitals
// @access  Private (admin only)
router.get('/hospitals', auth, async (req, res) => {
  try {
    // In a real app, you would fetch from database and check if user is admin
    // This is a placeholder response
    const hospitals = [
      {
        id: 1,
        name: 'Metro Hospital',
        address: '123 Healthcare St, Downtown',
        phone: '555-123-4567',
        departments: ['Neurology', 'Cardiology', 'Orthopedics', 'Pediatrics'],
        doctors: 25,
        patients: 450
      },
      {
        id: 2,
        name: 'City General Hospital',
        address: '456 Medical Blvd, Uptown',
        phone: '555-987-6543',
        departments: ['Emergency', 'Surgery', 'Oncology', 'Radiology'],
        doctors: 30,
        patients: 580
      }
    ];
    
    res.json(hospitals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/admin/hospitals
// @desc    Add a new hospital
// @access  Private (admin only)
router.post('/hospitals', auth, async (req, res) => {
  try {
    const { name, address, phone, departments } = req.body;
    
    // Validation
    if (!name || !address || !phone) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }
    
    // In a real app, you would save to database and check if user is admin
    // This is a placeholder response
    const newHospital = {
      id: Math.floor(Math.random() * 1000),
      name,
      address,
      phone,
      departments: departments || [],
      doctors: 0,
      patients: 0
    };
    
    res.status(201).json(newHospital);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/departments
// @desc    Get all departments
// @access  Private (admin only)
router.get('/departments', auth, async (req, res) => {
  try {
    // In a real app, you would fetch from database and check if user is admin
    // This is a placeholder response
    const departments = [
      {
        id: 1,
        name: 'Neurology',
        head: 'Dr. Michael Chen',
        doctors: 5,
        patients: 120
      },
      {
        id: 2,
        name: 'Cardiology',
        head: 'Dr. Sarah Johnson',
        doctors: 6,
        patients: 150
      },
      {
        id: 3,
        name: 'Orthopedics',
        head: 'Dr. Robert Williams',
        doctors: 4,
        patients: 100
      }
    ];
    
    res.json(departments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/admin/departments
// @desc    Add a new department
// @access  Private (admin only)
router.post('/departments', auth, async (req, res) => {
  try {
    const { name, head } = req.body;
    
    // Validation
    if (!name) {
      return res.status(400).json({ msg: 'Department name is required' });
    }
    
    // In a real app, you would save to database and check if user is admin
    // This is a placeholder response
    const newDepartment = {
      id: Math.floor(Math.random() * 1000),
      name,
      head: head || 'Not assigned',
      doctors: 0,
      patients: 0
    };
    
    res.status(201).json(newDepartment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
