import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Avatar,
  Stack,
  Button,
  alpha,
  styled,
  useTheme
} from '@mui/material';
import { 
  AccessTime, 
  ArrowForward, 
  BookmarkBorder,
  Bookmark
} from '@mui/icons-material';

const ArticleCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(0,0,0,0.03)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
    '& .article-image': {
      transform: 'scale(1.05)'
    }
  }
}));

const CategoryChip = styled(Chip)(({ theme, categoryColor }) => ({
  borderRadius: 12,
  fontWeight: 600,
  backgroundColor: alpha(categoryColor || theme.palette.primary.main, 0.1),
  color: categoryColor || theme.palette.primary.main,
  '&:hover': {
    backgroundColor: alpha(categoryColor || theme.palette.primary.main, 0.2),
  }
}));

const ReadMoreButton = styled(Button)(({ theme }) => ({
  alignSelf: 'flex-start',
  fontWeight: 600,
  padding: theme.spacing(0.5, 0),
  '&:hover': {
    backgroundColor: 'transparent',
    '& .MuiSvgIcon-root': {
      transform: 'translateX(4px)'
    }
  },
  '& .MuiSvgIcon-root': {
    transition: 'transform 0.3s ease'
  }
}));

const HealthArticleCard = ({
  title,
  summary,
  image,
  category,
  categoryColor,
  author,
  authorAvatar,
  date,
  readTime,
  link,
  saved = false,
  onSave,
  featured = false
}) => {
  const theme = useTheme();
  
  // Category color mapping
  const categoryColorMap = {
    'Health Tips': theme.palette.success.main,
    'Nutrition': theme.palette.success.dark,
    'Fitness': theme.palette.info.main,
    'Mental Health': theme.palette.secondary.main,
    'Medical Research': theme.palette.primary.main,
    'Wellness': theme.palette.info.dark,
    'COVID-19': theme.palette.error.main,
    'Chronic Disease': theme.palette.warning.main,
    'Pediatrics': theme.palette.secondary.light,
    'Women\'s Health': theme.palette.secondary.dark,
    'Men\'s Health': theme.palette.primary.dark,
    'Elderly Care': theme.palette.warning.dark
  };
  
  const resolvedCategoryColor = categoryColor || categoryColorMap[category] || theme.palette.primary.main;
  
  return (
    <ArticleCard>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={featured ? 240 : 180}
          image={image}
          alt={title}
          className="article-image"
          sx={{ 
            transition: 'transform 0.6s ease',
            objectFit: 'cover'
          }}
        />
        
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 16, 
            left: 16, 
            right: 16,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {category && (
            <CategoryChip 
              label={category} 
              size="small" 
              categoryColor={resolvedCategoryColor}
            />
          )}
          
          {onSave && (
            <Button
              onClick={onSave}
              sx={{ 
                minWidth: 'auto', 
                p: 0.5,
                backgroundColor: alpha('#fff', 0.8),
                borderRadius: '50%',
                width: 36,
                height: 36,
                '&:hover': {
                  backgroundColor: alpha('#fff', 0.95),
                }
              }}
            >
              {saved ? 
                <Bookmark sx={{ color: theme.palette.primary.main }} /> : 
                <BookmarkBorder sx={{ color: theme.palette.text.secondary }} />
              }
            </Button>
          )}
        </Box>
      </Box>
      
      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography 
          variant={featured ? "h5" : "h6"} 
          component="h2" 
          gutterBottom
          fontWeight={600}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {summary}
        </Typography>
        
        <Box sx={{ mt: 'auto' }}>
          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center" 
            sx={{ mb: 2 }}
          >
            {author && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar 
                  src={authorAvatar} 
                  alt={author}
                  sx={{ width: 32, height: 32 }}
                />
                <Typography variant="body2" fontWeight={500}>
                  {author}
                </Typography>
              </Stack>
            )}
            
            {readTime && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <AccessTime fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  {readTime} min read
                </Typography>
              </Stack>
            )}
          </Stack>
          
          <ReadMoreButton 
            color="primary" 
            endIcon={<ArrowForward />}
            href={link}
          >
            Read More
          </ReadMoreButton>
        </Box>
      </CardContent>
    </ArticleCard>
  );
};

export default HealthArticleCard;
