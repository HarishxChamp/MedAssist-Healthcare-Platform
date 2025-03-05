import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  InputBase,
  alpha,
  styled,
  Divider,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications,
  Person,
  CalendarMonth,
  MedicalServices,
  Logout,
  Home,
  LocalHospital,
  Search,
  AccountCircle,
  ShoppingCart,
  VideoCall,
  LocalPharmacy,
  HealthAndSafety,
  KeyboardArrowDown,
  SupportAgent,
  MedicalInformation,
  EmergencyShare,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const pages = [
  { name: 'Home', path: '/', icon: <Home /> },
  { name: 'Find Doctor', path: '/doctors', icon: <LocalHospital /> },
  { name: 'Book Appointment', path: '/appointments', icon: <CalendarMonth /> },
  { name: 'Video Consult', path: '/video-consult', icon: <VideoCall /> },
  { name: 'Pharmacy', path: '/shop', icon: <LocalPharmacy /> },
  { name: 'Support', path: '/support', icon: <SupportAgent /> },
];

const settings = [
  { name: 'My Profile', icon: <Person />, path: '/profile' },
  { name: 'My Appointments', icon: <CalendarMonth />, path: '/my-appointments' },
  { name: 'Medical Records', icon: <MedicalServices />, path: '/medical-records' },
  { name: 'Logout', icon: <Logout />, path: '/logout' },
];

const SearchBox = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '25ch',
      '&:focus': {
        width: '35ch',
      },
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { getCartItemCount } = useCart();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMobileDrawer(open);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      console.log('Searching for:', searchTerm);
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSettingClick = (path) => {
    navigate(path);
    handleCloseUserMenu();
  };

  const cartItemCount = getCartItemCount();

  return (
    <AppBar 
      position="sticky" 
      elevation={3}
      sx={{ 
        backgroundColor: theme.palette.primary.main,
        borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 0.8 }}>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              alignItems: 'center',
            }}
          >
            <MedicalInformation sx={{ mr: 1, fontSize: 28 }} />
            MEDASSIST
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={mobileDrawer}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{ 
                  width: 280,
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                  height: '100%',
                }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    <MedicalInformation sx={{ mr: 1, fontSize: 24 }} />
                    MEDASSIST
                  </Typography>
                </Box>
                <Divider sx={{ bgcolor: alpha(theme.palette.common.white, 0.1) }} />
                <List>
                  {pages.map((page) => (
                    <ListItem
                      button
                      key={page.name}
                      component={Link}
                      to={page.path}
                      sx={{
                        py: 1.5,
                        '&:hover': { 
                          bgcolor: alpha(theme.palette.common.white, 0.1),
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>{page.icon}</ListItemIcon>
                      <ListItemText primary={page.name} />
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ bgcolor: alpha(theme.palette.common.white, 0.1) }} />
                <List>
                  {settings.map((setting) => (
                    <ListItem
                      button
                      key={setting.name}
                      component={Link}
                      to={setting.path}
                      sx={{
                        py: 1.5,
                        '&:hover': { 
                          bgcolor: alpha(theme.palette.common.white, 0.1),
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>{setting.icon}</ListItemIcon>
                      <ListItemText primary={setting.name} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              alignItems: 'center',
            }}
          >
            <MedicalInformation sx={{ mr: 1, fontSize: 24 }} />
            MEDASSIST
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ 
                  mx: 0.5, 
                  my: 1, 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center',
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 1,
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                  '&:hover': { 
                    bgcolor: alpha(theme.palette.common.white, 0.1),
                    transform: 'translateY(-2px)',
                  } 
                }}
                startIcon={page.icon}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <SearchBox sx={{ display: { xs: 'none', md: 'block' } }}>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search doctors, medicines..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleSearch}
            />
          </SearchBox>

          <IconButton size="large" color="inherit" sx={{ mr: 1 }}>
            <StyledBadge badgeContent={3} color="secondary">
              <Notifications />
            </StyledBadge>
          </IconButton>

          <IconButton 
            size="large" 
            color="inherit" 
            sx={{ mr: 2 }}
            component={Link}
            to="/cart"
          >
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account settings">
              <IconButton 
                onClick={handleOpenUserMenu} 
                sx={{ 
                  p: 0,
                  border: `2px solid ${alpha(theme.palette.common.white, 0.3)}`,
                  '&:hover': {
                    border: `2px solid ${alpha(theme.palette.common.white, 0.5)}`,
                  }
                }}
              >
                <Avatar 
                  alt="User Avatar" 
                  src="/static/images/avatar/2.jpg"
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                elevation: 3,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.2))',
                  mt: 1.5,
                  borderRadius: 2,
                  minWidth: 220,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>John Doe</Typography>
                <Typography variant="body2" color="text.secondary">john.doe@example.com</Typography>
              </Box>
              <Divider />
              {settings.map((setting) => (
                <MenuItem 
                  key={setting.name} 
                  onClick={() => handleSettingClick(setting.path)}
                  sx={{ 
                    py: 1.5,
                    '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) },
                  }}
                >
                  {setting.icon}
                  <Typography sx={{ ml: 2 }}>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
