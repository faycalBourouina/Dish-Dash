'use client';

import { createContext, useState, useReducer } from 'react';

// Create a new context called LandingRecipesContext
const LandingRecipesContext = createContext();

// Define initial state with an empty array for landingRecipes
const initialState = {
  landingRecipes: [],
};

const LandingRecipesProvider = ({ children }) => {
  // Use useReducer to manage state with landingReducer and initialState
  const [state, dispatch] = useReducer(landingReducer, initialState);

  // Provide state and dispatch values to child components via context
  return (
    <LandingRecipesContext.Provider value={{ state, dispatch }}>
      {children}
    </LandingRecipesContext.Provider>
  );
}

export { LandingRecipesContext, LandingRecipesProvider }; 