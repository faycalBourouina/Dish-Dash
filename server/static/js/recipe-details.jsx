const { List, ListItem, IconButton, Link } = MaterialUI;
function RecipeDetails({ isLogged, recipe, activeTab, handleUpdateFavorites, recipesLength, handleSelectedRecipe, cachedItems, setCachedItems, onRecipeClick}) {

  const { id, title, image, instructions, ingredients, summary, isFavorite: initIsFavorite } = recipe;
  
  const [isFavorite, setIsFavorite] = useState(initIsFavorite);


  return (
    <Grid 
      container 
      justifyContent="space-between"
      pr={10} pl ={10}
    >
      <Grid item xs={12} md={6}>
        {activeTab === 'search' && (
          <Box marginBottom={2}>
            <Link onClick={() => handleSelectedRecipe(id)}>
                {recipesLength} {recipesLength === 1 ? 'recipe' : 'recipes'} found 
            </Link>
          </Box>
        )}
        <Box marginBottom={4}>
          <Typography variant="h3">{title || recipe.name}</Typography>
        </Box>
        <Box>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img src={image} alt={title} />
            {isLogged && (
              <IconButton
                onClick={() => {handleUpdateFavorites(id, isFavorite)}}
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
        <SimilarRecipes
          isLogged={isLogged}
          handleUpdateFavorites={handleUpdateFavorites}
          recipeId={recipe.id}
          onRecipeClick={onRecipeClick}
        />
    </Grid>
  );
}