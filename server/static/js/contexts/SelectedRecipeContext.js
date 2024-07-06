const { createContext, useState, useReducer } = React;

// Define initial state with an empty array for favoriteRecipes
const initialState = {
    selectedRecipe: null
}

// Create a context for managing the selected recipe
const SelectedRecipeContext = createContext();

// Define a provider component for the selected recipe context
const SelectedRecipeProvider = ({ children }) => {
    // Initialize the state using a reducer
    const [state, dispatch] = useReducer(selectedReducer, initialState);
    
    // Provide state and dispatch values to child components via context
    return (
        <SelectedRecipeContext.Provider value={{ state, dispatch }}>
            {children}
        </SelectedRecipeContext.Provider>
    );
}
