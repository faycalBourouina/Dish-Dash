const { List, ListItem } = MaterialUI;
function RecipeDetails({ isLogged, recipe, activeTab, handleUpdateFavorites, recipesLength, handleSelectedRecipe, cachedItems, setCachedItems}) {

  const { id, title, image, instructions, ingredients, summary } = recipe;
  
  return (
    <Grid 
      container 
      justifyContent="space-between"
      pr={10} pl ={10}
    >
      <Grid item xs={12} md={6}>
          {activeTab === 'search' && (
            <Box marginBottom={2}>
              <ButtonBase onClick={() => handleSelectedRecipe(id)}>
                {recipesLength} {recipesLength === 1 ? 'recipe' : 'recipes'} found
              </ButtonBase>
            </Box>
          )}
        <Box marginBottom={4}>
          <Typography variant="h3">{title}</Typography>
        </Box>
        <Box marginBottom={4}>
          <img src={image} alt={name} />
        </Box>
        <Box marginBottom={4}>
          <RecipeTags recipe={recipe} />
        </Box>
        <Box marginBottom={2}>
          <Typography variant="h4">Summary:</Typography>
        </Box>
        <Box marginBottom={4}>
          {summary}
        </Box>
        <Box marginBottom={2}>
          <Typography variant="h4">Ingredients:</Typography>
        </Box>
        <Box marginBottom={4}>
          <List>
            {ingredients.map((ingredient) => (
              <ListItem key={ingredient.id}>{ingredient.original_name}</ListItem>
            ))}
          </List>
        </Box>
        <Box marginBottom={2}>
          <Typography variant="h4">Instructions:</Typography>
        </Box>
        <Box marginBottom={2}>
        <div dangerouslySetInnerHTML={{ __html: instructions }}></div>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} container justifyContent="flex-end">
        <Box display="flex" flexDirection="column">
          <Typography variant="h4"  style={{ textAlign: 'center' }}>
            <img
              src="/static/img/Walmart_logo_transparent_png.png"
              alt="Walmart Logo"
              style={{ height: '48px'}}
            />
          </Typography>

          <ItemList
            recipe={recipe}
            cachedItems={cachedItems}
            setCachedItems={setCachedItems}
          />
        </Box>
      </Grid>
    </Grid>
  );
}