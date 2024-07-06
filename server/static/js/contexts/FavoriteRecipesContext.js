const  { createContext, useState, useReducer } = React;

// Create a context for managing favorite recipes
const FavoriteRcipesContext = createContext();

// Initialize the state with an empty array of favorite recipes
const initialState = {
  favoriteRecipes: [],
}

// Define a provider component for the favorite recipes context
function FavoriteRecipesProvider ({ children }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState)
  
  // Provide state and dispatch values to child components via context
  return (
      <FavoriteRcipesContext.Provider value={{ state, dispatch }}>
        {children}
      </FavoriteRcipesContext.Provider>
    );
};
