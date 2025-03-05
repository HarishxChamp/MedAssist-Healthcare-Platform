import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Avatar,
  Chip,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import {
  Search,
  VideoCall,
  Star,
  Language,
  AccessTime,
  Close,
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  Chat,
  ScreenShare,
  CallEnd,
} from '@mui/icons-material';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'General Physician',
    experience: '15 years',
    rating: 4.9,
    reviews: 128,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    languages: ['English', 'Spanish'],
    nextAvailable: '10:00 AM Today',
    fee: 40,
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Pediatrician',
    experience: '12 years',
    rating: 4.8,
    reviews: 96,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    languages: ['English', 'Mandarin'],
    nextAvailable: '11:30 AM Today',
    fee: 45,
  },
  {
    id: 3,
    name: 'Dr. Emily Williams',
    specialty: 'Dermatologist',
    experience: '10 years',
    rating: 4.7,
    reviews: 156,
    image: 'https://randomuser.me/api/portraits/women/42.jpg',
    languages: ['English', 'French'],
    nextAvailable: '2:00 PM Today',
    fee: 50,
  },
];

const VideoConsult = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videoCallOpen, setVideoCallOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  const handleStartCall = (doctor) => {
    setSelectedDoctor(doctor);
    setVideoCallOpen(true);
  };

  const VideoCallDialog = () => (
    <Dialog
      fullScreen
      open={videoCallOpen}
      onClose={() => setVideoCallOpen(false)}
    >
      <Box sx={{ height: '100%', bgcolor: '#1a1a1a', color: 'white' }}>
        {/* Video Call Header */}
        <Box sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'rgba(0,0,0,0.3)',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={selectedDoctor?.image} sx={{ mr: 2 }} />
            <Typography variant="h6">
              {selectedDoctor?.name}
            </Typography>
          </Box>
          <Typography>
            Duration: 00:05:32
          </Typography>
        </Box>

        {/* Video Streams */}
        <Box sx={{ display: 'flex', height: 'calc(100% - 160px)' }}>
          {/* Main Video (Doctor) */}
          <Box sx={{
            flex: 1,
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Box sx={{
              width: '100%',
              height: '100%',
              bgcolor: '#2a2a2a',
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Typography variant="h5" color="text.secondary">
                Doctor's Video
              </Typography>
            </Box>
          </Box>

          {/* Patient Video (Small) */}
          <Box sx={{
            position: 'absolute',
            right: 20,
            top: 100,
            width: 200,
            height: 150,
            bgcolor: '#2a2a2a',
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Typography variant="body2" color="text.secondary">
              Your Video
            </Typography>
          </Box>
        </Box>

        {/* Controls */}
        <Box sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          bgcolor: 'rgba(0,0,0,0.3)',
        }}>
          <IconButton
            sx={{ bgcolor: audioEnabled ? 'primary.main' : 'error.main' }}
            onClick={() => setAudioEnabled(!audioEnabled)}
          >
            {audioEnabled ? <Mic /> : <MicOff />}
          </IconButton>
          <IconButton
            sx={{ bgcolor: videoEnabled ? 'primary.main' : 'error.main' }}
            onClick={() => setVideoEnabled(!videoEnabled)}
          >
            {videoEnabled ? <Videocam /> : <VideocamOff />}
          </IconButton>
          <IconButton
            sx={{ bgcolor: 'primary.main' }}
            onClick={() => setChatOpen(!chatOpen)}
          >
            <Chat />
          </IconButton>
          <IconButton sx={{ bgcolor: 'primary.main' }}>
            <ScreenShare />
          </IconButton>
          <IconButton
            sx={{ bgcolor: 'error.main' }}
            onClick={() => setVideoCallOpen(false)}
          >
            <CallEnd />
          </IconButton>
        </Box>
      </Box>
    </Dialog>
  );

  return (
    <Box sx={{ py: 4 }}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Video Consultation
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Connect with experienced doctors from the comfort of your home
        </Typography>

        {/* Search */}
        <TextField
          fullWidth
          placeholder="Search doctors by name, specialty..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        {/* Doctors List */}
        <Grid container spacing={3}>
          {doctors.map((doctor) => (
            <Grid item xs={12} md={4} key={doctor.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Avatar
                      src={doctor.image}
                      sx={{ width: 64, height: 64 }}
                    />
                    <Box>
                      <Typography variant="h6">
                        {doctor.name}
                      </Typography>
                      <Typography color="text.secondary">
                        {doctor.specialty}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating
                          value={doctor.rating}
                          readOnly
                          precision={0.1}
                          size="small"
                        />
                        <Typography variant="body2" color="text.secondary">
                          ({doctor.reviews})
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Chip
                      icon={<Star />}
                      label={`${doctor.experience} experience`}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                    {doctor.languages.map((lang) => (
                      <Chip
                        key={lang}
                        icon={<Language />}
                        label={lang}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTime fontSize="small" />
                        {doctor.nextAvailable}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ${doctor.fee}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      startIcon={<VideoCall />}
                      onClick={() => handleStartCall(doctor)}
                    >
                      Start Call
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <VideoCallDialog />
      </Container>
    </Box>
  );
};

export default VideoConsult;
