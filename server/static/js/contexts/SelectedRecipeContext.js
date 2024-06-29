const { createContext, useState } = React;

const SelectedRecipeContext = createContext();

const SelectedRecipeProvider = ({ children }) => {
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    return (
        <SelectedRecipeContext.Provider value={{ selectedRecipe, setSelectedRecipe}}>
            {children}
        </SelectedRecipeContext.Provider>
    );
}
