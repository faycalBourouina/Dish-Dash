const  { createContext, useState, useReducer } = React;

const FavoriteRcipesContext = createContext();

// Initial state with an empty array
const initialState = {
  favoriteRecipes: [],
}

function FavoriteRecipesProvider ({ children }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState)

  return (
    <FavoriteRcipesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoriteRcipesContext.Provider>
  );
};