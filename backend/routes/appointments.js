const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET api/appointments
// @desc    Get all appointments for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // In a real app, you would fetch from database
    // This is a placeholder response
    const appointments = [
      {
        id: 1,
        date: '2025-03-10',
        time: '10:00 AM',
        doctor: 'Dr. Michael Chen',
        specialty: 'Neurologist',
        status: 'Confirmed',
        type: 'In-person'
      },
      {
        id: 2,
        date: '2025-03-15',
        time: '2:30 PM',
        doctor: 'Dr. Sarah Johnson',
        specialty: 'Cardiologist',
        status: 'Pending',
        type: 'Video Consultation'
      }
    ];
    
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/appointments
// @desc    Create a new appointment
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { date, time, doctorId, type, symptoms } = req.body;
    
    // Validation
    if (!date || !time || !doctorId || !type) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }
    
    // In a real app, you would save to database
    // This is a placeholder response
    const newAppointment = {
      id: Math.floor(Math.random() * 1000),
      date,
      time,
      doctor: 'Dr. Michael Chen', // In real app, would look up doctor name from doctorId
      specialty: 'Neurologist',
      status: 'Pending',
      type,
      symptoms: symptoms || ''
    };
    
    res.status(201).json(newAppointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/appointments/:id
// @desc    Update an appointment
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { date, time, type, status } = req.body;
    
    // In a real app, you would update in database
    // This is a placeholder response
    const updatedAppointment = {
      id: req.params.id,
      date: date || '2025-03-10',
      time: time || '10:00 AM',
      doctor: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      status: status || 'Confirmed',
      type: type || 'In-person'
    };
    
    res.json(updatedAppointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/appointments/:id
// @desc    Delete an appointment
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // In a real app, you would delete from database
    // This is a placeholder response
    res.json({ msg: 'Appointment removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
