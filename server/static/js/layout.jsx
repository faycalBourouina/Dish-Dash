const { useState, useEffect } = React;
const { Grid, Box } = MaterialUI;

function Layout({ isLogged , handleLogin, handleSignup, handleLogout, cachedItems, setCachedItems, cachedLanding, setCachedLanding, cachedFavorites, setCachedFavorites, cachedSearch, setCachedSearch}) {
    const [activeTab, setActiveTab] = React.useState("home");
    const [recipes, setRecipes] = React.useState([]);
    const [selectedRecipe, setSelectedRecipe] = React.useState(null);
    
    async function handleSearch(searchQuery) {

        setCachedSearch([]); // clear the cached search results
        const params = new URLSearchParams(searchQuery);
        const response = await fetch(`/search?${params.toString()}`);
        const data = await response.json();
        const { recipes: { results } } = data;
        setSelectedRecipe(null); // clear the selected recipe
        setCachedSearch(results); // cache the search results
        setRecipes(results);
        setActiveTab("search"); // switch to the search tab
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
          setCachedFavorites(updatedRecipes);
          setSelectedRecipe("");
          setActiveTab("favorites")

        } else {
          // Error handling
          console.error("Failed to remove favorite");
        }
      } else if (response.ok) {
        // Recipe added to favorites successfully
        console.log("Recipe added to favorites");
        const { favorite } = data;
        
        // Update the cachedFavorites state by adding the new favorite recipe
        setCachedFavorites([...cachedFavorites, favorite]);
        
        console.log("cachedFavorites in update", cachedFavorites);

      } else {
        // Error handling for other response statuses
        console.error("Failed to add recipe to favorites");
      }
    }
    
    async function fetchLandingRecipes() {
        if (cachedLanding.length) {
          setRecipes(cachedLanding);
        } else {     
          const response = await fetch("/landing");
          const data = await response.json();
          const { recipes } = data;
          setCachedLanding(recipes);
          setRecipes(recipes);
        }
    }

    async function fetchFavoritesRecipes() {
        if (cachedFavorites.length) {
          console.log("cachedFavorites in fetch", cachedFavorites);
          setRecipes(cachedFavorites);
        } else {
          const userId = isLogged;
          const response = await fetch(`users/${userId}/favorites`);
          const data = await response.json();
          const { favorites } = data;
          console.log("favorites from server: ", favorites);
          setCachedFavorites(favorites);
          setRecipes(favorites);
        }
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
        <Grid container direction="column">
          <Grid item xs={12}>
            <Box pl={8} pr={8} pt={4} pb={0}>
              <Navbar 
                isLogged={isLogged}
                handleLogin={handleLogin}
                handleSignup={handleSignup}
                handleLogout={handleLogout}
                setActiveTab={setActiveTab} 
                setSelectedRecipe={setSelectedRecipe} 
              />
            </Box>
          </Grid>

          <Box p={8}>
            <Grid item xs={12}>
              <SearchForm onSearch={handleSearch} />
            </Grid>
            <Grid item xs={12}>
              {selectedRecipe ? (
                <RecipeDetails
                  isLogged={isLogged}
                  recipe={selectedRecipe}
                  activeTab={activeTab}
                  handleUpdateFavorites={handleUpdateFavorites}
                  recipesLength = {recipes.length}
                  handleSelectedRecipe = {handleSelectedRecipe}
                  cachedItems={cachedItems}
                  setCachedItems={setCachedItems}
                />
              ) : (
                <RecipeList
                  recipes={recipes}
                  activeTab={activeTab}
                  onRecipeClick={handleRecipeClick}
                />
              )}
            </Grid>
          </Box>
        </Grid>
      </div>
    );
}