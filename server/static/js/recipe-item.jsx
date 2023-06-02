const { Card, CardContent, CardMedia, Grid, Typography, CardActions, Link } = MaterialUI;

function RecipeItem({ recipe, onRecipeClick, summary, vegetarian, vegan, glutenFree }) {
    
    const MAX_SUMMARY_LENGTH = 100; // Maximum number of characters for summary
    
    const sanitizedSummary = summary
    ? new DOMParser()
        .parseFromString(summary, 'text/html')
        .body.textContent.trim()
    : '';
  const truncatedSummary =
    sanitizedSummary && sanitizedSummary.length > MAX_SUMMARY_LENGTH
      ? `${sanitizedSummary.substring(0, MAX_SUMMARY_LENGTH).trim()}...`
      : sanitizedSummary;
      
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ width: '100%', maxWidth: '100%', borderRadius: 0 }}>
        <CardMedia
          component="img"
          height="100%"
          image={recipe.image}
          alt={recipe.title}
          sx={{ backgroundColor: '#e0e0e0' }}
        />
        <CardContent>
          <Typography variant="h6" component="div" noWrap>
            {recipe.title || recipe.name}
          </Typography>
          {truncatedSummary && (
            <Typography variant="body2" color="text.secondary">
              {truncatedSummary}
            </Typography>
          )}
        </CardContent>

          <CardActions sx={{ justifyContent: 'space-between' }}>
            {(vegetarian || vegan || glutenFree) && (
                <Stack direction="row" spacing={1} alignItems="center">
                {vegetarian && (
                    <Typography variant="body2" color="text.secondary">
                    Vegetarian
                    </Typography>
                )}
                {vegan && (
                    <Typography variant="body2" color="text.secondary">
                    Vegan
                    </Typography>
                )}
                {glutenFree && (
                    <Typography variant="body2" color="text.secondary">
                    Gluten-Free
                    </Typography>
                )}
                </Stack>
            )}
            <Link 
                component="button" 
                variant="body2" 
                color="text.secondary"
                onClick={() => onRecipeClick(recipe)}
            >
              Read More
            </Link>
          </CardActions>
      </Card>
    </Grid>
  );
  }