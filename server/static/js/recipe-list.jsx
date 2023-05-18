function RecipeList({ recipes, onRecipeClick }) {
    return (
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} onClick={() => onRecipeClick(recipe)}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
          </li>
        ))}
      </ul>
    );
  }