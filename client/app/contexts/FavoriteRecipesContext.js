'use client';

import { createContext, useReducer } from 'react';

// Create a context for managing favorite recipes
const FavoriteRcipesContext = createContext();

// Initialize the state with an empty array of favorite recipes
const initialState = {
  favoriteRecipes: [],
}

// Define a provider component for the favorite recipes context
const FavoriteRecipesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState)
  
  // Provide state and dispatch values to child components via context
  return (
      <FavoriteRcipesContext.Provider value={{ state, dispatch }}>
        {children}
      </FavoriteRcipesContext.Provider>
    );
};

export { FavoriteRcipesContext ,FavoriteRecipesProvider } 
