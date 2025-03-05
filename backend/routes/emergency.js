const express = require('express');
const router = express.Router();

// @route   GET api/emergency/hospitals
// @desc    Get all emergency hospitals
// @access  Public
router.get('/hospitals', async (req, res) => {
  try {
    // In a real app, you would fetch from database
    // This is a placeholder response
    const emergencyHospitals = [
      {
        id: 1,
        name: 'Metro Hospital',
        address: '123 Healthcare St, Downtown',
        phone: '555-123-4567',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        emergencyServices: ['Trauma Center', 'Cardiac Emergency', 'Stroke Center'],
        waitTime: '15 mins',
        open24Hours: true
      },
      {
        id: 2,
        name: 'City General Hospital',
        address: '456 Medical Blvd, Uptown',
        phone: '555-987-6543',
        coordinates: { lat: 40.7328, lng: -73.9860 },
        emergencyServices: ['Trauma Center', 'Pediatric Emergency', 'Burn Unit'],
        waitTime: '30 mins',
        open24Hours: true
      },
      {
        id: 3,
        name: 'St. Mary\'s Hospital',
        address: '789 Health Ave, Midtown',
        phone: '555-456-7890',
        coordinates: { lat: 40.7528, lng: -73.9660 },
        emergencyServices: ['General Emergency', 'Poison Control'],
        waitTime: '10 mins',
        open24Hours: true
      }
    ];
    
    res.json(emergencyHospitals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/emergency/contacts
// @desc    Get emergency contacts
// @access  Public
router.get('/contacts', async (req, res) => {
  try {
    // In a real app, you would fetch from database
    // This is a placeholder response
    const emergencyContacts = [
      {
        id: 1,
        name: 'Emergency Medical Services',
        number: '911',
        description: 'For life-threatening emergencies'
      },
      {
        id: 2,
        name: 'Poison Control Center',
        number: '1-800-222-1222',
        description: 'For poisoning emergencies'
      },
      {
        id: 3,
        name: 'National Suicide Prevention Lifeline',
        number: '1-800-273-8255',
        description: 'For mental health crises'
      },
      {
        id: 4,
        name: 'Disaster Response',
        number: '1-800-621-3362',
        description: 'FEMA helpline for disasters'
      }
    ];
    
    res.json(emergencyContacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/emergency/first-aid
// @desc    Get first aid guides
// @access  Public
router.get('/first-aid', async (req, res) => {
  try {
    // In a real app, you would fetch from database
    // This is a placeholder response
    const firstAidGuides = [
      {
        id: 1,
        title: 'CPR',
        steps: [
          'Check the scene for safety',
          'Check responsiveness',
          'Call 911',
          'Open the airway',
          'Check for breathing',
          'Begin chest compressions',
          'Give rescue breaths if trained',
          'Continue CPR until help arrives'
        ],
        image: 'https://example.com/cpr.jpg',
        videoUrl: 'https://example.com/cpr-video'
      },
      {
        id: 2,
        title: 'Choking',
        steps: [
          'Ask if they are choking',
          'Encourage them to cough',
          'Perform abdominal thrusts (Heimlich maneuver)',
          'Continue until the object is expelled or the person becomes unconscious',
          'If unconscious, begin CPR'
        ],
        image: 'https://example.com/choking.jpg',
        videoUrl: 'https://example.com/choking-video'
      },
      {
        id: 3,
        title: 'Bleeding Control',
        steps: [
          'Apply direct pressure to the wound',
          'Use a clean cloth or bandage',
          'Elevate the injured area if possible',
          'Apply pressure to pressure points if necessary',
          'Apply a tourniquet as a last resort',
          'Seek medical attention'
        ],
        image: 'https://example.com/bleeding.jpg',
        videoUrl: 'https://example.com/bleeding-video'
      }
    ];
    
    res.json(firstAidGuides);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/emergency/report
// @desc    Report an emergency
// @access  Public
router.post('/report', async (req, res) => {
  try {
    const { type, location, description, contact } = req.body;
    
    // Validation
    if (!type || !location || !contact) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }
    
    // In a real app, you would save to database and notify emergency services
    // This is a placeholder response
    const emergencyReport = {
      id: Math.floor(Math.random() * 1000),
      type,
      location,
      description: description || '',
      contact,
      status: 'Reported',
      timestamp: new Date().toISOString()
    };
    
    res.status(201).json({
      success: true,
      message: 'Emergency reported successfully',
      report: emergencyReport
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
