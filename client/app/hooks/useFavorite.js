import { useContext, useMemo } from 'react';


const useFavorite = () => {
  // Extract necessary context values
  const { setFavoriteMessage, setAlertOpen } = useContext(FavoriteMessageContext);
  const { dispatch: landingDispatch } = useContext(LandingRecipesContext);
  const { state: { favoriteRecipes }, dispatch: favoritesDispatch } = useContext(FavoriteRcipesContext);
  const { state: { selectedRecipe }, dispatch: selectedDispatch } = useContext(SelectedRecipeContext);
  const { isLogged } = useContext(AuthContext);

  // Function to update favorite recipes on the server
  async function updateRecipeFavorite(recipeId, isFavorite) {
      const userId = isLogged; // Assume isLogged contains the current user's ID
      const method = isFavorite ? "DELETE" : "PATCH"; // Determine the HTTP method based on the action
      const response = await fetch(`/users/${userId}/favorites/${recipeId}`, { method });
    
      // Check if the server response is not OK and set an error message
      if (!response.ok) {
          setFavoriteMessage(`Failed to ${isFavorite ? "remove" : "add"} recipe to favorites`);
          return;
      }
      // Return the favorite recipe object or the ID of the removed recipe
      const favorite = isFavorite ? { removedRecipeId: recipeId } : await response.json();
      return favorite;
  }
    
  // Function to set the favoriteMessage state based on the action and its success
  function updateFavoriteMessage(isAdding, isSuccess, recipeName = '') {
      const message = isSuccess
          ? isAdding
              ? `${recipeName} added to favorites successfully` // Message for adding to favorites
              : `${recipeName} removed from favorites successfully` // Message for removing from favorites
          : isAdding
              ? 'Failed to add recipe to favorites' // Error message for adding
              : 'Failed to remove recipe from favorites'; // Error message for removing
      setFavoriteMessage(message); // Update the favoriteMessage state
      setAlertOpen(true); // Open the alert Snackbar
  }

  // Triggered by favorite button event handler to update the favorites on recipes
  async function handleUpdateFavorites(recipeId, isFavorite) {
      const result = await updateRecipeFavorite(recipeId, isFavorite);
      const actionSuccess = result && ('favorite' in result || 'removedRecipeId' in result);

      if (actionSuccess && result.favorite) {
          // If a recipe was added, update states and set success message
          const { favorite } = result;
          favoritesDispatch({ type: ADD_RECIPE, payload: { favorite: favorite } });
          landingDispatch({ type: ADD_RECIPE, payload: { favorite: favorite } });
          selectedRecipe && selectedRecipe.id === favorite.id && selectedDispatch({ type: ADD_RECIPE });
          updateFavoriteMessage(true, true, favorite.name);
      } else if (actionSuccess && result.removedRecipeId) {
          // If a recipe was removed, find it, update states, and set success message
          const { removedRecipeId } = result;
          const removedRecipe = favoriteRecipes.find(r => r.id === removedRecipeId);
          favoritesDispatch({ type: 'REMOVE_RECIPE', payload: { removedRecipeId: removedRecipeId } });
          landingDispatch({ type: 'REMOVE_RECIPE', payload: { removedRecipeId: removedRecipeId } });
          selectedRecipe && selectedRecipe.id === removedRecipeId && selectedDispatch({ type: REMOVE_RECIPE });
          updateFavoriteMessage(false, true, removedRecipe.name);
      } else {
          // If there was an error, set the error message
          updateFavoriteMessage(isFavorite, false);
      }
  }
  
  // Memoize the handleUpdateFavorites function with favoriteRecipes as a dependency
  return useMemo(() => ({
      handleUpdateFavorites,
  }), [favoriteRecipes]);
}
