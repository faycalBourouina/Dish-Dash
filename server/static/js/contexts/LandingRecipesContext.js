const  { createContext, useState, useReducer} = React;

const LandingRecipesContext = createContext();

// Initial state with an empty array for cachedLanding
const initialState = {
  cachedLanding: [],
}

function LandingRecipesProvider ({ children }) {
  //const [cachedLanding, setCachedLanding] = useState([]);
  const [state, dispatch] = useReducer(landingReducer, initialState)

  return (
    <LandingRecipesContext.Provider value={{ state, dispatch }}>
      {children}
    </LandingRecipesContext.Provider>
  );
};