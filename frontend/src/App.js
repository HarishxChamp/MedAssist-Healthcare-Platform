import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from '@mui/material';

// Import Google Fonts
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/roboto';

// Theme
import theme from './styles/theme';

// Context
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/utils/ScrollToTop';

// Pages
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Medicines from './pages/Medicines';
import VideoConsult from './pages/VideoConsult';
import LabTests from './pages/LabTests';
import Emergency from './pages/Emergency';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/user/Profile';
import DoctorDashboard from './pages/doctor/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import Shop from './pages/Shop';
import Support from './pages/Support';
import Search from './pages/Search';
import Cart from './pages/Cart';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Box 
            className="App" 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              minHeight: '100vh',
              backgroundColor: theme.palette.background.default
            }}
          >
            <Navbar />
            <Box 
              component="main" 
              sx={{ 
                flexGrow: 1,
                pt: { xs: 2, md: 3 },
                pb: { xs: 4, md: 6 }
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/medicines" element={<Medicines />} />
                <Route path="/video-consult" element={<VideoConsult />} />
                <Route path="/lab-tests" element={<LabTests />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/support" element={<Support />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </Box>
            <Footer />
            <ToastContainer 
              position="bottom-right"
              theme="light"
              style={{ fontSize: '14px' }}
            />
          </Box>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
