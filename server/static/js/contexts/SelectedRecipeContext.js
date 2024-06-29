const { createContext, useState, useReducer } = React;

const initialState = {
    selectedRecipe: null
}

const SelectedRecipeContext = createContext();

const SelectedRecipeProvider = ({ children }) => {
    //const [selectedRecipe, setSelectedRecipe] = useState(null)
    const [state, dispatch] = useReducer(selectedReducer, initialState)
    return (
        <SelectedRecipeContext.Provider value={{ state, dispatch}}>
            {children}
        </SelectedRecipeContext.Provider>
    );
}
