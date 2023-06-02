const { Card, CardContent, CardMedia, Grid, Typography } = MaterialUI;

function RecipeItem({ recipe, onRecipeClick }) {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card onClick={() => onRecipeClick(recipe)}>
        <CardMedia
          component="img"
          height="140"
          image={recipe.image}
          alt={recipe.title}
          sx={{ width: '100%', objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {recipe.title || recipe.name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
