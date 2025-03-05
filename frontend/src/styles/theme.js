import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A2342', // Deep navy blue - professional and trustworthy
      light: '#1E3A5F',
      dark: '#051629',
      contrastText: '#fff',
    },
    secondary: {
      main: '#2D6E7E', // Soft teal - calming and medical
      light: '#3A8A9E',
      dark: '#1D4E5A',
      contrastText: '#fff',
    },
    tertiary: {
      main: '#5C8D89', // Muted sage - healing and natural
      light: '#7AA9A5',
      dark: '#3F6360',
    },
    accent: {
      main: '#E76F51', // Soft coral - warm and approachable
      light: '#F08A71',
      dark: '#C55A3E',
    },
    error: {
      main: '#D62839', // Clear red for errors
      light: '#E05363',
      dark: '#B01F2E',
    },
    warning: {
      main: '#F4A261', // Warm orange for warnings
      light: '#F6B787',
      dark: '#E58B45',
    },
    info: {
      main: '#457B9D', // Informative blue
      light: '#5E96BB',
      dark: '#33617F',
    },
    success: {
      main: '#2A9D8F', // Success teal
      light: '#3CBCAD',
      dark: '#1E7A70',
    },
    background: {
      default: '#FFFFFF', // Clean white background
      paper: '#FFFFFF',
      light: '#F8F9FA', // Very light gray for alternate sections
    },
    text: {
      primary: '#2B2D42', // Dark blue-gray for text - professional
      secondary: '#4A4E69', // Medium blue-gray for secondary text
      light: '#6C757D', // Light gray for tertiary text
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#0A2342',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#0A2342',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      letterSpacing: '0.02em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
          transition: 'all 0.3s ease',
          fontWeight: 600,
        },
        contained: {
          backgroundColor: '#0A2342',
          boxShadow: '0 2px 8px rgba(10, 35, 66, 0.25)',
          '&:hover': {
            backgroundColor: '#051629',
            boxShadow: '0 4px 12px rgba(10, 35, 66, 0.35)',
          },
        },
        outlined: {
          borderColor: '#0A2342',
          color: '#0A2342',
          borderWidth: '1.5px',
          '&:hover': {
            borderColor: '#051629',
            backgroundColor: 'rgba(10, 35, 66, 0.04)',
            borderWidth: '1.5px',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(10, 35, 66, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          border: '1px solid rgba(0, 0, 0, 0.03)',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0A2342',
          color: '#FFFFFF',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          '&.Mui-active': {
            color: '#0A2342',
            fontWeight: 600,
          },
          '&.Mui-completed': {
            color: '#2D6E7E',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&.Mui-focused fieldset': {
              borderColor: '#0A2342',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: '#0A2342',
            },
          },
          '& .MuiInputLabel-root': {
            '&.Mui-focused': {
              color: '#0A2342',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        },
        elevation2: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        },
        elevation3: {
          boxShadow: '0 6px 16px rgba(0,0,0,0.07)',
        },
        elevation4: {
          boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
        filled: {
          backgroundColor: 'rgba(10, 35, 66, 0.08)',
          '&:hover': {
            backgroundColor: 'rgba(10, 35, 66, 0.12)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          '&.Mui-selected': {
            color: '#0A2342',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#0A2342',
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#0A2342',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover': {
            backgroundColor: 'rgba(10, 35, 66, 0.04)',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '2px solid #fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 600,
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.05)',
    '0 4px 8px rgba(0,0,0,0.05)',
    '0 6px 12px rgba(0,0,0,0.06)',
    '0 8px 16px rgba(0,0,0,0.07)',
    '0 10px 20px rgba(0,0,0,0.08)',
    '0 12px 24px rgba(0,0,0,0.09)',
    '0 14px 28px rgba(0,0,0,0.10)',
    '0 16px 32px rgba(0,0,0,0.11)',
    '0 18px 36px rgba(0,0,0,0.12)',
    '0 20px 40px rgba(0,0,0,0.13)',
    '0 22px 44px rgba(0,0,0,0.14)',
    '0 24px 48px rgba(0,0,0,0.15)',
    '0 26px 52px rgba(0,0,0,0.16)',
    '0 28px 56px rgba(0,0,0,0.17)',
    '0 30px 60px rgba(0,0,0,0.18)',
    '0 32px 64px rgba(0,0,0,0.19)',
    '0 34px 68px rgba(0,0,0,0.20)',
    '0 36px 72px rgba(0,0,0,0.21)',
    '0 38px 76px rgba(0,0,0,0.22)',
    '0 40px 80px rgba(0,0,0,0.23)',
    '0 42px 84px rgba(0,0,0,0.24)',
    '0 44px 88px rgba(0,0,0,0.25)',
    '0 46px 92px rgba(0,0,0,0.26)',
    '0 48px 96px rgba(0,0,0,0.27)',
  ],
});

export default theme;
