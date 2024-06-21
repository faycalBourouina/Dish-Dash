const  { createContext, useState } = React;

const CachedLandingContext = createContext();

function CachedLandingProvider ({ children }) {
  const [cachedLanding, setCachedLanding] = useState([]);

  return (
    <CachedLandingContext.Provider value={{ cachedLanding, setCachedLanding }}>
      {children}
    </CachedLandingContext.Provider>
  );
};