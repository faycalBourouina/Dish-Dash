function RecipeDetails({ isLogged, recipe, activeTab, handleUpdateFavorites, recipesLength, handleSelectedRecipe, cachedItems, setCachedItems}) {

  return (
    <Grid container 
      justifyContent="center"
      xs={12} spacing={2}
      pt={8} pb={8}
    > 
      <Grid item xs={12} md={8}>
          {
            activeTab === "search" && (
            <h3 onClick={() => handleSelectedRecipe()}>
              {recipesLength} {recipesLength === 1 ? "recipe" : "recipes"} found
            </h3>)
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
        {isLogged && <button onClick={handleUpdateFavorites}>Chef's kiss</button>}
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