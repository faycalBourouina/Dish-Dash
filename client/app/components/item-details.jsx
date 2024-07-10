import { styled, Rating, Box, Typography, CardContent, CardActions } from '@mui/material';

const StyledCard = styled(Card)({
  maxWidth: 220,
  margin: '16px',
  borderRadius: 0
});

const StyledCardMedia = styled(CardMedia)({
    height: 220,
});

const Tag = styled('div')(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#004c91',
  padding: '2px 10px',
  marginRight: 8,
  borderRadius: 0,
  border: '1.5px solid #004c91',
  fontSize: 10,
}));

const ItemDetails = ({ item }) => {
  const { title, price, main_image, link, best_seller, shipping, ratings_total, rating } = item;

  return (
    <StyledCard>
      <StyledCardMedia image={main_image} title={title} />
      <CardContent>
        <Box
          sx={{ 
            display: 'flex', 
            justifyContent: 'flex-start', 
            alignItems: 'center',
            marginBottom: '8px',
            }}
        >
          {best_seller && <Tag>Best Seller</Tag>}
          {shipping && <Tag>Free Shipping</Tag>}
        </Box>
        <Typography variant="h6" sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-start', 
          alignItems: 'center',
          gap: '4px',
          marginBottom: '8px',
          }}
        >
            <Rating
              name="read-only"
              value={rating}
              readOnly
              size="small"
              sx={{ '& .MuiRating-icon': { fontSize: '1rem' } }}
            />
            <Typography 
              variant="body2" 
              color="text.primary"
              sx={{ fontSize: '0.75rem' }}
            >
                {rating ? `( ${rating} )` : 'No reviews yet'}
            </Typography>
            {rating>0  && 
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ fontSize: '0.75rem', textDecoration: 'underline' }}
              >
                {ratings_total} reviews
              </Typography>
            }         
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start'}}>
          <Typography variant="h5">${price}</Typography>
        </Box>
      </CardContent>
      <CardActions 
        sx={{ 
          justifyContent: 'flex-start',
          marginBottom: '8px',
        }}>
        <Button
          href={link}
          target="_blank"
          color="primary"
          sx={{
            backgroundColor: '#0071dc',
            color: '#fff',
            padding: '8px 36px',
            borderRadius: '120px',
            '&:hover': {
              backgroundColor: '#004c91',
            },
          }}
        >
          Buy now
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default ItemDetails;