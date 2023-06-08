const { useState, useEffect } = React;
const { Grid, Box, Alert, Snackbar } = MaterialUI;

function Layout({ isLogged , newUser, setNewUser, handleLogin, handleSignup, handleLogout, message, setMessage, cachedItems, setCachedItems, cachedLanding, setCachedLanding, cachedFavorites, setCachedFavorites, cachedSearch, setCachedSearch}) {
    const [activeTab, setActiveTab] = React.useState("home"); // State variable to track which tab is active
    const [isLoading, setIsLoading] = React.useState(false); // State variable to track whether data is being fetched
    const [recipes, setRecipes] = React.useState([]); // State variable to store the recipes
    const [selectedRecipe, setSelectedRecipe] = React.useState(null); // State variable to store the selected recipe
    const [favoriteMessage, setFavoriteMessage] = useState(""); // State variable to store the favorite success message
    const [alertOpen, setAlertOpen] = useState(false); // State variable to control the Snackbar visibility
    
    
    async function handleSearch(searchQuery) {

        setIsLoading(true); // set isLoading to true before starting the fetch
        setCachedSearch([]); // clear the cached search results
        const params = new URLSearchParams(searchQuery);
        const response = await fetch(`/search?${params.toString()}`);
        const data = await response.json();
        console.log('data in handleSearch', data);
        const recipesResponse = data.recipes?.results || data.recipes || [];
        //setCachedSearch(recipes); // cache the search results
        setRecipes(recipesResponse); // update the recipes state to searched recipes
        setSelectedRecipe(null); // clear the selected recipe
        //setActiveTab("search"); // switch to the search tab
        setIsLoading(false); // set isLoading back to false once data has finished loading
    }

    function handleSelectedRecipe () {
      (selectedRecipe && activeTab === "search") && setSelectedRecipe(null);
    } 

    async function handleUpdateFavorites(recipeId, isFavorite) {
      const userId = isLogged;

      if (!isFavorite) {
        const response = await fetch(`/users/${userId}/favorites/${recipeId}`, {
          method: "PATCH",
        });
        const data = await response.json();
    
        if (response.ok) {
          // Recipe added to favorites successfully
          console.log("Recipe added to favorites");
          const { favorite } = data;
          console.log("favorite added is ", favorite);
          // Update the cachedFavorites state by adding the new favorite recipe
          setCachedFavorites([...cachedFavorites, favorite]);
          // Update the recipes state if the active tab is favorites
          activeTab === "favorites" && setRecipes([...recipes, favorite]);

          // Set the favorite success message
          setFavoriteMessage("Recipe added to favorites successfully");
        } else {
          // Error handling for other response statuses
          console.error("Failed to add recipe to favorites");
          // Failed to add recipe to favorites
          setFavoriteMessage("Failed to add recipe to favorites");
        }
      } else {
        const deleteResponse = await fetch(`/users/${userId}/favorites/${recipeId}`, {
          method: "DELETE",
        });
    
        if (deleteResponse.ok) {
          // Favorite removed successfully
          console.log("Favorite removed");
          setFavoriteMessage("Recipe removed from favorites successfully");
          // Update the recipes state by filtering out the deleted recipe
          const updatedRecipes = cachedFavorites.filter((r) => r.id !== recipeId);
          setCachedFavorites(updatedRecipes);
          // Update the recipes state if the active tab is favorites
          activeTab === "favorites" && setRecipes(updatedRecipes);
    
          // Update the selectedRecipe state if the deleted recipe is the selected recipe
          if (selectedRecipe && selectedRecipe.id === recipeId) {
            setSelectedRecipe(null);
            setActiveTab("favorites");
          }
        } else {
          // Error handling
          console.error("Failed to remove favorite");
          // Failed to add recipe to favorites
          setFavoriteMessage("Failed to remove recipe from favorites");
        }
      }
      setAlertOpen(true);
    }
    async function fetchLandingRecipes() {
        if (cachedLanding.length) {
          setRecipes(cachedLanding);
        } else {
          setIsLoading(true);     
          const response = await fetch("/landing");
          const data = await response.json();
          const { recipes } = data;

          setCachedLanding(recipes);
          setRecipes(recipes);
          setIsLoading(false);
        }
    }

    async function fetchFavoritesRecipes() {
        if (cachedFavorites.length) {
          console.log("cachedFavorites in fetch", cachedFavorites);
          setRecipes(cachedFavorites);
        } else {
          setIsLoading(true);
          const userId = isLogged;
          const response = await fetch(`users/${userId}/favorites`);
          const data = await response.json();
          const { favorites } = data;
          console.log("favorites from server: ", favorites);
          setCachedFavorites(favorites);
          setRecipes(favorites);
          setIsLoading(false);
        }
    }
    
    async function handleRecipeClick(recipe) {
        const response = await fetch(`/recipes/${recipe.id}`);
        const data = await response.json();
        const { ingredients } = await data.recipe;
        recipe.ingredients = ingredients;

        setSelectedRecipe(recipe);
    }


    useEffect(() => {
      if (!isLogged) {
        //Reset the cached items when isLogged value changes
        setCachedLanding([]);
        setCachedFavorites([]);
        setCachedSearch([]);
      }
    }, [isLogged]);
    
    useEffect(() => { fetchFavoritesRecipes()}, []);


    useEffect(() => {
      if (activeTab === "home") {
        fetchLandingRecipes();
      } else if (activeTab === "favorites") {
        fetchFavoritesRecipes();
      }
      console.log("recipes", recipes)
    }, [activeTab, isLogged]);

    return (
      <div>
        <Grid container direction="column">
          <Grid item xs={12}>
            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={() => setAlertOpen(false)}
              >
                <Alert
                  onClose={() => setAlertOpen(false)}
                  severity={favoriteMessage.includes("Failed") ? "error" : "success"}
                >
                {favoriteMessage}
                </Alert>
            </Snackbar>
            <Box pl={8} pr={8} pt={4} pb={0}>
                <Navbar 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isLogged={isLogged}
                newUser={newUser}
                setNewUser={setNewUser}
                handleLogin={handleLogin}
                handleSignup={handleSignup}
                handleLogout={handleLogout}
                message={message}
                setMessage={setMessage}
                setSelectedRecipe={setSelectedRecipe} 
              />
            </Box>
          </Grid>
          <Box p={8}>
            <Grid item xs={12}>
              <SearchForm onSearch={handleSearch} />
            </Grid>
            <Grid item xs={12} p={12}>
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
                  onRecipeClick={handleRecipeClick}
                />
              ) : (
                  <RecipeList
                    isLogged={isLogged}
                    isLoading={isLoading}
                    recipes={recipes}
                    activeTab={activeTab}
                    handleUpdateFavorites={handleUpdateFavorites}
                    onRecipeClick={handleRecipeClick}
                  />
                )
              }
            </Grid>
          </Box>
        </Grid>
      </div>
    );
}