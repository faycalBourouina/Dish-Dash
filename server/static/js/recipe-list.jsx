function RecipeList({ recipes, activeTab, onRecipeClick }) {
  return (
    <div>
      {recipes.length === 0 ? (
        <h1>No recipes found</h1>
      ) : (
        <div>
          {
            activeTab === "search" && (
            <h3>{recipes.length} {recipes.length === 1 ? "recipe" : "recipes"} found</h3>)
          }
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.id} onClick={() => onRecipeClick(recipe)}>
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}