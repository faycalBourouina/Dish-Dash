const { useState, useEffect } = React;

function Layout({ isLogged , handleLogin, handleLogout }) {
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
        setActiveTab("search"); // switch to the search tab
        console.log("activeTab after search", activeTab)  // activeTab is now "search"
    }

  function handleSelectedRecipe () {
    (selectedRecipe && activeTab === "search") && setSelectedRecipe(null);
  } 

    async function handleUpdateFavorites() {
      const userId = isLogged;
      const recipeId = selectedRecipe.id;
      const response = await fetch(`/users/${userId}/favorites/${recipeId}`, {
        method: "PATCH",
      });
      const data = await response.json();
    
      if (response.status === 409 && data.message === "Favorite already exists") {
        // Send a DELETE request to remove the favorite
        const deleteResponse = await fetch(`/users/${userId}/favorites/${recipeId}`, {
          method: "DELETE",
        });
        if (deleteResponse.ok) {
          // Favorite removed successfully
          console.log("Favorite removed");
          // Update the recipes state by filtering out the deleted recipe
          const updatedRecipes = recipes.filter((r) => r.id !== recipeId);
          setRecipes(updatedRecipes);
          setSelectedRecipe("");
          setActiveTab("favorites")
          console.log("activeTab after delete", activeTab)
        } else {
          // Error handling
          console.error("Failed to remove favorite");
        }
      } else if (response.ok) {
        // Recipe added to favorites successfully
        console.log("Recipe added to favorites");
        const { favorite } = data;
        // Update the recipes state by adding the new favorite recipe
        setRecipes([...recipes, favorite]);
      } else {
        // Error handling for other response statuses
        console.error("Failed to add recipe to favorites");
      }
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
          <Navbar 
            isLogged={isLogged} 
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            setActiveTab={setActiveTab} 
            setSelectedRecipe={setSelectedRecipe} 
          />
          
          <SearchForm onSearch={handleSearch} />
          <div>
            {selectedRecipe ? (
              <RecipeDetails
                recipe={selectedRecipe}
                activeTab={activeTab}
                handleUpdateFavorites={handleUpdateFavorites}
                recipesLength = {recipes.length}
                handleSelectedRecipe = {handleSelectedRecipe}
               />
            ) : (
              <RecipeList 
                recipes={recipes}
                activeTab={activeTab}
                onRecipeClick={handleRecipeClick}
              />
            )}
          </div>
        </div>
      </div>
    );
}