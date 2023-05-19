function RecipeDetails({ recipe }) {
  
  async function handleUpdateFavorites() {
    const userId = isLogged;
    const recipeId = recipe.id;
    const response = await fetch(`/users/${userId}/favorites/${recipeId}`, {
      method: "PATCH",
    });
    const data = await response.json();

    if (response.status === 409 && data.message === "Favorite already exists") {
      // Send a DELETE request to remove the favorite
      const deleteResponse = await fetch(`/users/${userId}/favorites/${recipeId}`, {
        method: "DELETE",
      });
      if (deleteResponse.ok) {
        // Favorite removed successfully
        console.log("Favorite removed");
        // Handle the updated favorite state if needed
      } else {
        // Error handling
        console.error("Failed to remove favorite");
      }
    } else if (response.ok) {
      // Recipe added to favorites successfully
      console.log("Recipe added to favorites");
      const { favorite } = data;
      // Handle the updated favorite state if needed
    } else {
      // Error handling for other response statuses
      console.error("Failed to add recipe to favorites");
    }
  }

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