function RecipeDetails({ isLogged, recipe, activeTab, handleUpdateFavorites, recipesLength, handleSelectedRecipe, cachedItems, setCachedItems}) {

  return (
    <Grid container 
      justifyContent="center"
      spacing={2}
      pt={8} pb={8}
    > 
      <Grid item xs={12} md={8}>
          {
            activeTab === "search" && (
            <ButtonBase onClick={() => handleSelectedRecipe(recipe.id)}>
              {recipesLength} {recipesLength === 1 ? "recipe" : "recipes"} found
            </ButtonBase>)
          }
          <h2>{recipe.name}</h2>
          <img src={recipe.image} alt={recipe.title} />
          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original_name}</li>
            ))}
          </ul>
          <h3>Instructions:</h3>
          <div dangerouslySetInnerHTML={{ __html: recipe.instructions }}></div>
        {isLogged && <button onClick={handleUpdateFavorites(recipe.id)}>Chef's kiss</button>}
      </Grid>
      <Grid item xs={12} md={4}>        
        <ItemList 
          recipe = {recipe}
          cachedItems={cachedItems}
          setCachedItems={setCachedItems}
        />
      </Grid>
    </Grid>
  );
}