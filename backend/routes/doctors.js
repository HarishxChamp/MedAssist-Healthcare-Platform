const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET api/doctors
// @desc    Get all doctors
// @access  Public
router.get('/', async (req, res) => {
  try {
    // In a real app, you would fetch from database
    // This is a placeholder response
    const doctors = [
      {
        id: 1,
        name: 'Dr. Michael Chen',
        specialty: 'Neurologist',
        hospital: 'Metro Hospital',
        rating: 4.8,
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        experience: '15 years',
        patients: 1234,
        education: 'Harvard Medical School',
        about: 'Dr. Chen is a board-certified neurologist specializing in headache disorders and stroke management.'
      },
      {
        id: 2,
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiologist',
        hospital: 'City General Hospital',
        rating: 4.9,
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        experience: '12 years',
        patients: 987,
        education: 'Johns Hopkins University',
        about: 'Dr. Johnson is an experienced cardiologist with expertise in preventive cardiology and heart failure management.'
      },
      {
        id: 3,
        name: 'Dr. Robert Williams',
        specialty: 'Orthopedic Surgeon',
        hospital: 'St. Mary\'s Hospital',
        rating: 4.7,
        image: 'https://randomuser.me/api/portraits/men/45.jpg',
        experience: '20 years',
        patients: 1567,
        education: 'Stanford University',
        about: 'Dr. Williams specializes in joint replacement surgery and sports medicine.'
      }
    ];
    haaaaeuhfac
    harish
    res.json(doctors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/doctors/:id
// @desc    Get doctor by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    // In a real app, you would fetch from database
    // This is a placeholder response
    const doctor = {
      id: req.params.id,
      name: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      hospital: 'Metro Hospital',
      rating: 4.8,
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      experience: '15 years',
      patients: 1234,
      education: 'Harvard Medical School',
      about: 'Dr. Chen is a board-certified neurologist specializing in headache disorders and stroke management.',
      availability: [
        { day: 'Monday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] },
        { day: 'Wednesday', slots: ['10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'] },
        { day: 'Friday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '3:00 PM', '4:00 PM'] }
      ]
    };
    
    res.json(doctor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/doctors/specialty/:specialty
// @desc    Get doctors by specialty
// @access  Public
router.get('/specialty/:specialty', async (req, res) => {
  try {
    const specialty = req.params.specialty;
    
    // In a real app, you would fetch from database
    // This is a placeholder response
    const doctors = [
      {
        id: 1,
        name: 'Dr. Michael Chen',
        specialty: specialty,
        hospital: 'Metro Hospital',
        rating: 4.8,
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      {
        id: 4,
        name: 'Dr. Emily Rodriguez',
        specialty: specialty,
        hospital: 'City General Hospital',
        rating: 4.6,
        image: 'https://randomuser.me/api/portraits/women/22.jpg'
      }
    ];
    
    res.json(doctors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/doctors/:id/appointments
// @desc    Get doctor's appointments (doctor view)
// @access  Private (doctor only)
router.get('/:id/appointments', auth, async (req, res) => {
  try {
    // In a real app, you would fetch from database and check if user is the doctor
    // This is a placeholder response
    const appointments = [
      {
        id: 1,
        patient: 'John Doe',
        date: '2025-03-10',
        time: '10:00 AM',
        type: 'Video Consultation',
        status: 'Upcoming',
        symptoms: 'Fever, Headache',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      {
        id: 2,
        patient: 'Jane Smith',
        date: '2025-03-10',
        time: '11:30 AM',
        type: 'In-person',
        status: 'Checked-in',
        symptoms: 'Back pain',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
      }
    ];
    
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
