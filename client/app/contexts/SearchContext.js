'use client';

import  { createContext, useState } from 'react';

const SearchContext = createContext()

const SearchProvider = ({ children }) => {
  const [cachedSearch, setCachedSearch] = useState([]);

  return (
    <SearchContext.Provider value={{ cachedSearch, setCachedSearch}}>
        {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider }