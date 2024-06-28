const  { createContext, useState, useReducer } = React;

const CachedFavoritesContext = createContext();

// Initial state with an empty array for cachedLanding
const initialState = {
  cachedFavorites: [],
}

function CachedFavoritesProvider ({ children }) {
  //const [cachedFavorites, setCachedFavorites] = useState([]);
  const [state, dispatch] = useReducer(favoritesReducer, initialState)

  return (
    <CachedFavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </CachedFavoritesContext.Provider>
  );
};