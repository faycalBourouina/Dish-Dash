const { styled } = MaterialUI;

const StyledCard = styled(Card)({
  maxWidth: 220,
  margin: '16px',
  borderRadius: 0
});

const StyledCardMedia = styled(CardMedia)({
    height: 220,
});

const ItemDetails = ({ item }) => {
  const { title, description, price, main_image, link } = item;

  return (
    <StyledCard>
      <StyledCardMedia image={main_image} title={title} />
      <CardContent>
        <Typography variant="h6"> {title} </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="h6">${price}</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ marginTop: -2, justifyContent: 'flex-end' }}>
        <Button
          href={link}
          target="_blank"
          color="primary"
          sx={{
            backgroundColor: '#0071dc',
            color: '#fff',
            padding: '8px 36px',
            textTransform: 'none',
            borderRadius: '120px',
            '&:hover': {
              backgroundColor: '#0063cc',
            },
          }}
        >
          Buy now
        </Button>
      </CardActions>
    </StyledCard>
  );
};