import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  useTheme,
  alpha,
  Avatar,
  Chip,
} from '@mui/material';
import {
  ExpandMore,
  Phone,
  Email,
  Chat,
  QuestionAnswer,
  MedicalServices,
  LocalHospital,
  AccessTime,
  ContactSupport,
  HealthAndSafety,
  Healing,
  LocalPharmacy,
  VideoCall,
  ArrowForward,
  Check,
  Schedule,
  SupportAgent,
} from '@mui/icons-material';

// FAQ data
const faqs = [
  {
    question: 'How do I book an appointment with a doctor?',
    answer: 'You can book an appointment by navigating to the "Book Appointment" section, selecting your preferred doctor, choosing an available time slot, and confirming your booking details. You will receive a confirmation email with your appointment details.'
  },
  {
    question: 'What should I do if I need to cancel or reschedule my appointment?',
    answer: 'To cancel or reschedule an appointment, go to "My Appointments" in your profile, select the appointment you wish to modify, and click on "Cancel" or "Reschedule". Please note that cancellations should be made at least 4 hours before the scheduled appointment time to avoid cancellation fees.'
  },
  {
    question: 'How does the video consultation work?',
    answer: 'Our video consultation service allows you to connect with doctors remotely. After booking a video consultation, you will receive a link via email. At the scheduled time, click on the link to join the consultation. Ensure you have a stable internet connection and your device has a working camera and microphone.'
  },
  {
    question: 'Is my medical data secure on your platform?',
    answer: 'Yes, we take data security very seriously. All your medical information is encrypted and stored securely in compliance with healthcare data protection regulations. We never share your data with third parties without your explicit consent.'
  },
  {
    question: 'How can I order prescription medications?',
    answer: 'To order prescription medications, upload your prescription in the "Shop" section, select the required medicines, and proceed to checkout. Our pharmacists will verify your prescription before processing your order. For refills, you can use previously uploaded prescriptions if they are still valid.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept various payment methods including credit/debit cards, net banking, digital wallets, and UPI. All payments are processed through secure payment gateways to ensure your financial information remains protected.'
  },
  {
    question: 'How long does medicine delivery take?',
    answer: 'Standard delivery typically takes 24-48 hours depending on your location. We also offer express delivery options in select areas where medicines can be delivered within 4-6 hours. You can track your order status in real-time through your account.'
  },
  {
    question: 'Can I return medicines if I receive the wrong order?',
    answer: 'Yes, if you receive incorrect medicines or if there are quality issues, you can initiate a return within 48 hours of delivery. Please note that we cannot accept returns for temperature-sensitive medications or opened packages due to safety regulations.'
  },
];

// Support channels
const supportChannels = [
  {
    title: 'Phone Support',
    description: 'Speak directly with our customer support team',
    icon: <Phone fontSize="large" />,
    contact: '+1 (800) MED-CARE',
    availability: '24/7 Support',
    action: 'Call Now',
  },
  {
    title: 'Email Support',
    description: 'Send us an email and we\'ll respond within 24 hours',
    icon: <Email fontSize="large" />,
    contact: 'support@medcare.com',
    availability: '24 hour response time',
    action: 'Email Us',
  },
  {
    title: 'Live Chat',
    description: 'Chat with our support team in real-time',
    icon: <Chat fontSize="large" />,
    contact: 'Available on website and app',
    availability: 'Mon-Sat, 8am-8pm',
    action: 'Start Chat',
  },
];

const Support = () => {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(false);

  const handleFaqChange = (panel) => (event, isExpanded) => {
    setExpandedFaq(isExpanded ? panel : false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, subject, message });
    // Here you would typically send the form data to your backend
    alert('Your message has been sent. We will get back to you soon!');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          How Can We Help You?
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Our dedicated support team is here to assist you with any questions or issues you may have regarding our medical services.
        </Typography>
      </Box>

      {/* Support Channels */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {supportChannels.map((channel, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card 
              elevation={3}
              sx={{ 
                height: '100%',
                borderRadius: 2,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  {channel.icon}
                </Avatar>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {channel.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {channel.description}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {channel.contact}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  <AccessTime sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
                  {channel.availability}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ borderRadius: 2 }}
                >
                  {channel.action}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Contact Form and FAQs */}
      <Grid container spacing={6}>
        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Send Us a Message
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Fill out the form below and our team will get back to you as soon as possible.
          </Typography>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ borderRadius: 2, py: 1.5 }}
                  >
                    Submit Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* FAQs */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Find quick answers to common questions about our services.
          </Typography>
          <Box>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                expanded={expandedFaq === `panel${index}`}
                onChange={handleFaqChange(`panel${index}`)}
                elevation={1}
                sx={{ 
                  mb: 2,
                  borderRadius: '8px !important',
                  overflow: 'hidden',
                  '&:before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{ 
                    backgroundColor: expandedFaq === `panel${index}` ? alpha(theme.palette.primary.main, 0.05) : 'transparent',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    }
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Support Features */}
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
          Why Choose Our Support?
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
          We're committed to providing exceptional support for all your healthcare needs.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <SupportAgent />
              </Avatar>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                24/7 Support
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our support team is available round the clock to assist you with any urgent issues.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <HealthAndSafety />
              </Avatar>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Medical Experts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our support team includes medical professionals who can provide accurate guidance.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <Schedule />
              </Avatar>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Quick Response
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We aim to respond to all queries within 2 hours during business hours.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <Healing />
              </Avatar>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Personalized Care
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We provide tailored support based on your specific healthcare needs.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Support;
