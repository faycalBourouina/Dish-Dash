function RecipeDetails({ recipe, handleUpdateFavorites }) {
  
  return (
    <div>
      <h2>{recipe.title}</h2>
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
  );
}