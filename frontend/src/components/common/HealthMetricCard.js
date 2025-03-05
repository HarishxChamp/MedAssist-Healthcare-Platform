import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Stack,
  styled,
  alpha,
  useTheme
} from '@mui/material';
import { 
  MonitorHeart, 
  LocalHospital, 
  Bloodtype, 
  Thermostat, 
  Scale, 
  Opacity
} from '@mui/icons-material';

const MetricCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(0,0,0,0.03)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
  },
}));

const MetricIcon = styled(Box)(({ theme, color }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: alpha(color || theme.palette.primary.main, 0.1),
  color: color || theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
}));

const HealthMetricCard = ({ 
  title, 
  value, 
  unit, 
  icon, 
  color, 
  progress, 
  status, 
  description 
}) => {
  const theme = useTheme();
  
  // Map icon name to component
  const iconMap = {
    heart: <MonitorHeart sx={{ fontSize: 30 }} />,
    hospital: <LocalHospital sx={{ fontSize: 30 }} />,
    blood: <Bloodtype sx={{ fontSize: 30 }} />,
    temperature: <Thermostat sx={{ fontSize: 30 }} />,
    weight: <Scale sx={{ fontSize: 30 }} />,
    water: <Opacity sx={{ fontSize: 30 }} />
  };

  // Status color mapping
  const statusColorMap = {
    normal: theme.palette.success.main,
    warning: theme.palette.warning.main,
    alert: theme.palette.error.main,
    good: theme.palette.success.main,
    excellent: theme.palette.success.dark,
    low: theme.palette.info.main
  };

  return (
    <MetricCard>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <MetricIcon color={color}>
            {iconMap[icon] || iconMap.hospital}
          </MetricIcon>
          
          {status && (
            <Chip 
              label={status} 
              size="small"
              sx={{ 
                backgroundColor: alpha(statusColorMap[status.toLowerCase()] || theme.palette.primary.main, 0.1),
                color: statusColorMap[status.toLowerCase()] || theme.palette.primary.main,
                fontWeight: 600,
                borderRadius: '12px'
              }}
            />
          )}
        </Stack>
        
        <Typography variant="h5" component="div" fontWeight={600} mb={0.5}>
          {title}
        </Typography>
        
        <Stack direction="row" alignItems="baseline" spacing={1} mb={1}>
          <Typography variant="h3" component="div" fontWeight={700} color={color || theme.palette.primary.main}>
            {value}
          </Typography>
          {unit && (
            <Typography variant="body1" color="text.secondary">
              {unit}
            </Typography>
          )}
        </Stack>
        
        {description && (
          <Typography variant="body2" color="text.secondary" mb={2}>
            {description}
          </Typography>
        )}
        
        {progress !== undefined && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: alpha(color || theme.palette.primary.main, 0.1),
                '& .MuiLinearProgress-bar': {
                  backgroundColor: color || theme.palette.primary.main,
                  borderRadius: 4
                }
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              {progress}% of target
            </Typography>
          </Box>
        )}
      </CardContent>
    </MetricCard>
  );
};

export default HealthMetricCard;
