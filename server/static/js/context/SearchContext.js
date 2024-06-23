const { createContext, useState } = React;

const SearchContext = createContext()

function SearchProvider({ children }) {
  const [cachedSearch, setCachedSearch] = useState([]);

  return (
    <SearchContext.Provider value={{ cachedSearch, setCachedSearch}}>
        {children}
    </SearchContext.Provider>
  );
};