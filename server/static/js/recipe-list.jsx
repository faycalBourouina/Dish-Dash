function RecipeList({ isLogged, isLoading, recipes, activeTab, handleUpdateFavorites, onRecipeClick }) {
  console.log('recipes in RecipeList', recipes);

  if (isLoading) {
    return <RecipeListSkeleton />;
  }
  else if (!isLoading) {
    return (
      <div>
        {recipes?.length === 0 ? (
        <Grid container spacing={8} pl={40}>
          <Box 
            display="flex" 
            justifyContent="center"
            alignItems="center"
            style={{ height: '100%'}}
          >
            <img
              src="static/img/no_recipe_found.png"
              alt="No results found"
              style={{ width: '85%', height: '85%' }}
            />
          </Box>
        </Grid>
        ) : (
          <div>
            {activeTab === 'search' && (
              <Box pb={8}>
                  <Typography variant="h5" gutterBottom>
                    {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}{' '}
                    found:
                  </Typography>
              </Box>
            )}
            <Grid container spacing={8}>
              {recipes.map((recipe) => (
                <RecipeItem
                  isLogged={isLogged}
                  handleUpdateFavorites={handleUpdateFavorites}
                  key={recipe.id}
                  recipe={recipe}
                  onRecipeClick={onRecipeClick}
                  summary={recipe.summary}
                />
              ))}
            </Grid>
          </div>
        )}
      </div>
    );
   }
}