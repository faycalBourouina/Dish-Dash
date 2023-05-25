function RecipeDetails({ isLogged, recipe, activeTab, handleUpdateFavorites, recipesLength, handleSelectedRecipe, cachedItems, setCachedItems}) {

  return (
    <div>
      <div>
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
      </div>
      <div>
        <ItemList 
          recipe = {recipe}
          cachedItems={cachedItems}
          setCachedItems={setCachedItems}
        />
      </div>
    </div>

  );
}