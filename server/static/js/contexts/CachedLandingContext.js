const  { createContext, useState, useReducer} = React;

const CachedLandingContext = createContext();

// Initial state with an empty array for cachedLanding
const initialState = {
  cachedLanding: [],
}

function CachedLandingProvider ({ children }) {
  const [cachedLanding, setCachedLanding] = useState([]);
  //const [state, dispatch] = useReducer(landingReducer, initialState)

  return (
    <CachedLandingContext.Provider value={{ cachedLanding, setCachedLanding }}>
      {children}
    </CachedLandingContext.Provider>
  );
};