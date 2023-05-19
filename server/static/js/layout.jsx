const { useState, useEffect } = React;

function Layout({ isLogged }) {
    const [activeTab, setActiveTab] = React.useState("home");
    const [recipes, setRecipes] = React.useState([]);
    const [selectedRecipe, setSelectedRecipe] = React.useState(null);
    
    async function handleSearch(searchQuery) {
        const params = new URLSearchParams(searchQuery);
        const response = await fetch(`/search?${params.toString()}`);
        const data = await response.json();
        const { recipes: { results } } = data;
        setSelectedRecipe(null); // clear the selected recipe
        setRecipes(results);
    }
    
    async function fetchLandingRecipes() {
        const response = await fetch("/");
        const data = await response.json();
        const { recipes: { results } } = data;
        setRecipes(results);

    }

    async function fetchFavoritesRecipes() {
        const userId = isLogged;
        const response = await fetch(`users/${userId}/favorites`);
        const data = await response.json();
        const { favorites } = data;
        setRecipes(favorites);
    }
    
    async function handleRecipeClick(recipe) {
        const response = await fetch(`/recipes/${recipe.id}`);
        const data = await response.json();
        const recipe_details = await data.recipe;
        setSelectedRecipe(recipe_details);
    }
    
    useEffect(() => {
      if (activeTab === "home") {
        fetchLandingRecipes();
      } else if (activeTab === "favorites") {
        fetchFavoritesRecipes();
      }
    }, [activeTab]);
  
    return (
      <div>
        <div className="container">
          <Navbar isLogged={isLogged} setActiveTab={setActiveTab} setSelectedRecipe={setSelectedRecipe} />
          <SearchForm onSearch={handleSearch} />
          <div>
            {selectedRecipe ? (
              <RecipeDetails recipe={selectedRecipe} />
            ) : (
              <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick} />
            )}
          </div>
        </div>
      </div>
    );
}