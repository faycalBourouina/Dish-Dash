const { List, ListItem } = MaterialUI;

function RecipeDetails({ isLogged, recipe, activeTab, handleUpdateFavorites, recipesLength, handleSelectedRecipe, cachedItems, setCachedItems}) {

  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={12} md={6}>
          {activeTab === 'search' && (
            <Box marginBottom={2}>
              <ButtonBase onClick={() => handleSelectedRecipe(recipe.id)}>
                {recipesLength} {recipesLength === 1 ? 'recipe' : 'recipes'} found
              </ButtonBase>
            </Box>
          )}
        <Box marginBottom={4}>
          <Typography variant="h3">{recipe.name}</Typography>
        </Box>
        <Box marginBottom={4}>
          <img src={recipe.image} alt={recipe.title} />
        </Box>
        <Box marginBottom={2}>
          <Typography variant="h4">Ingredients:</Typography>
        </Box>
        <Box marginBottom={4}>
          <List>
            {recipe.ingredients.map((ingredient) => (
              <ListItem key={ingredient.id}>{ingredient.original_name}</ListItem>
            ))}
          </List>
        </Box>
        <Box marginBottom={2}>
          <Typography variant="h4">Instructions:</Typography>
        </Box>
        <Box marginBottom={2}>
        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }}></div>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} container justifyContent="flex-end">
        <ItemList
          recipe={recipe}
          cachedItems={cachedItems}
          setCachedItems={setCachedItems}
        />
      </Grid>
    </Grid>
  );
}