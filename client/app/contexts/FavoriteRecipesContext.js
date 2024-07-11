'use client';

import { createContext, useReducer } from 'react';
import { favoritesReducer } from '../reducers';

// Create a context for managing favorite recipes
const FavoriteRecipesContext = createContext();

// Initialize the state with an empty array of favorite recipes
const initialState = {
  favoriteRecipes: [],
}

// Define a provider component for the favorite recipes context
const FavoriteRecipesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState)
  
  // Provide state and dispatch values to child components via context
  return (
      <FavoriteRecipesContext.Provider value={{ state, dispatch }}>
        {children}
      </FavoriteRecipesContext.Provider>
    );
};

export { FavoriteRecipesContext ,FavoriteRecipesProvider } 
