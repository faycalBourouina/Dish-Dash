function RecipeList({ isLogged, isLoading, recipes, activeTab, handleUpdateFavorites, onRecipeClick }) {
  console.log('recipes in RecipeList', recipes);

  if (isLoading) {
    return <RecipeListSkeleton />;
  }
  else if (!isLoading) {
    return (
      <div>
        {recipes?.length === 0 ? (
          <h1>No recipes found</h1>
        ) : (
          <div>
            {activeTab === 'search' && (
              <h3>
                {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}{' '}
                found
              </h3>
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