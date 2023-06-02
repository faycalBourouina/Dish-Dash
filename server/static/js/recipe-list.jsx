function RecipeList({ recipes, activeTab, onRecipeClick }) {
  console.log('RecipeList', recipes);
  return (
    <div>
      {recipes.length === 0 ? (
        <h1>No recipes found</h1>
      ) : (
        <div>
          {activeTab === 'search' && (
            <h3>
              {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}{' '}
              found
            </h3>
          )}
          <Grid container spacing={2}>
            {recipes.map((recipe) => (
              <RecipeItem
                key={recipe.id}
                recipe={recipe}
                onRecipeClick={onRecipeClick}
              />
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
}