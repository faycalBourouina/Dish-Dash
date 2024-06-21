const  { createContext, useState } = React;

const CachedFavoritesContext = createContext();

function CachedFavoritesProvider ({ children }) {
  const [cachedFavorites, setCachedFavorites] = useState([]);

  return (
    <CachedFavoritesContext.Provider value={{ cachedFavorites, setCachedFavorites}}>
      {children}
    </CachedFavoritesContext.Provider>
  );
};