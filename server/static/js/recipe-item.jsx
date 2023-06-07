const { Card, CardContent, CardMedia, Grid, Typography, CardActions, Link, IconButton} = MaterialUI;

function RecipeItem({ isLogged, handleUpdateFavorites, recipe, onRecipeClick }) {

  const {id, image, summary, vegan, vegetarian, glutenFree, isFavorite: initIsFavorite } = recipe;

  const [isFavorite, setIsFavorite] = useState(initIsFavorite);

  const handleFavoriteClick = (id, isFavorite) => {
    handleUpdateFavorites(id, isFavorite);
    setIsFavorite(!isFavorite);
  };

  const MAX_SUMMARY_LENGTH = 100; // Maximum number of characters for summary
    
  const sanitizedSummary = summary
    ? new DOMParser()
        .parseFromString(summary, 'text/html')
        .body.textContent.trim()
    : '';
  
  // update recipe summary with sanitized summary
  recipe.summary = sanitizedSummary;

  const truncatedSummary =
    sanitizedSummary && sanitizedSummary.length > MAX_SUMMARY_LENGTH
      ? `${sanitizedSummary.substring(0, MAX_SUMMARY_LENGTH).trim()}...`
      : sanitizedSummary;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ width: '100%', maxWidth: '100%', borderRadius: 0 }}>
        <div style={{ position: 'relative' }}>
            <CardMedia
                component="img"
                height="100%"
                image={image}
                alt={recipe.title || recipe.name}
                sx={{ backgroundColor: '#e0e0e0' }}
            />
            {isLogged && (
            <IconButton
              onClick={() => handleFavoriteClick(id, isFavorite)}
              aria-label="add to favorites"
              sx={{ opacity: isFavorite ? 1 : 0.5 }}
              style={{ position: 'absolute', top: 0, right: 0 }}
            >
              <i
                className="material-icons"
                style={{
                  fontSize: '40px',
                  color: isFavorite ? '#FFCB05' : 'rgba(255, 255, 255, 1)',
                  WebkitTextStroke: '3px black',
                }}
              >
                favorite
              </i>
            </IconButton>
            )}
        </div>

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
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
            <Button 
                size="small" 
                color="primary"
                onClick={() => onRecipeClick(recipe)}
            >
                Learn More
            </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}