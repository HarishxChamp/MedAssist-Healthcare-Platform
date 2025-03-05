const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET api/patients
// @desc    Get all patients (admin or doctor view)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // In a real app, you would fetch from database and check user role
    // This is a placeholder response
    const patients = [
      {
        id: 1,
        name: 'John Doe',
        age: 45,
        gender: 'Male',
        phone: '555-123-4567',
        email: 'john.doe@example.com',
        lastVisit: '2025-03-01',
        condition: 'Hypertension',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      {
        id: 2,
        name: 'Jane Smith',
        age: 32,
        gender: 'Female',
        phone: '555-987-6543',
        email: 'jane.smith@example.com',
        lastVisit: '2025-02-28',
        condition: 'Diabetes',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
      }
    ];
    
    res.json(patients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/patients/:id
// @desc    Get patient by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    // In a real app, you would fetch from database and check permissions
    // This is a placeholder response
    const patient = {
      id: req.params.id,
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      phone: '555-123-4567',
      email: 'john.doe@example.com',
      address: '123 Main St, Anytown, USA',
      bloodType: 'O+',
      allergies: ['Penicillin', 'Peanuts'],
      medicalHistory: [
        { condition: 'Hypertension', diagnosedDate: '2020-05-15', status: 'Ongoing' },
        { condition: 'Appendicitis', diagnosedDate: '2015-08-22', status: 'Resolved' }
      ],
      medications: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
        { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily' }
      ],
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    };
    
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/patients/:id/medical-records
// @desc    Get patient's medical records
// @access  Private
router.get('/:id/medical-records', auth, async (req, res) => {
  try {
    // In a real app, you would fetch from database and check permissions
    // This is a placeholder response
    const medicalRecords = [
      {
        id: 1,
        date: '2025-03-01',
        doctor: 'Dr. Michael Chen',
        diagnosis: 'Hypertension',
        prescription: [
          { medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' }
        ],
        notes: 'Patient should monitor blood pressure daily and maintain low sodium diet.',
        followUp: '2025-04-01'
      },
      {
        id: 2,
        date: '2025-02-15',
        doctor: 'Dr. Sarah Johnson',
        diagnosis: 'Upper Respiratory Infection',
        prescription: [
          { medication: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', duration: '10 days' },
          { medication: 'Acetaminophen', dosage: '500mg', frequency: 'As needed for fever', duration: 'As needed' }
        ],
        notes: 'Patient should rest and increase fluid intake.',
        followUp: 'As needed'
      }
    ];
    
    res.json(medicalRecords);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/patients/:id/medical-records
// @desc    Add a medical record for a patient
// @access  Private (doctor only)
router.post('/:id/medical-records', auth, async (req, res) => {
  try {
    const { diagnosis, prescription, notes, followUp } = req.body;
    
    // Validation
    if (!diagnosis) {
      return res.status(400).json({ msg: 'Diagnosis is required' });
    }
    
    // In a real app, you would save to database and check if user is a doctor
    // This is a placeholder response
    const newRecord = {
      id: Math.floor(Math.random() * 1000),
      date: new Date().toISOString().split('T')[0],
      doctor: 'Dr. Michael Chen',
      diagnosis,
      prescription: prescription || [],
      notes: notes || '',
      followUp: followUp || 'As needed'
    };
    
    res.status(201).json(newRecord);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
