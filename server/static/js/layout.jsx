const { useState, useEffect, useContext } = React;
const { Grid, Box, Alert, Snackbar } = MaterialUI;

function Layout({ isLogged , newUser, setNewUser, handleLogin, handleSignup, handleLogout, message, setMessage, cachedItems, setCachedItems, cachedFavorites, setCachedFavorites, cachedSearch, setCachedSearch}) {
    const [activeTab, setActiveTab] = React.useState("home"); // State variable to track which tab is active
    const [isLoading, setIsLoading] = React.useState(false); // State variable to track whether data is being fetched
    const [recipes, setRecipes] = React.useState([]); // State variable to store the recipes
    const [selectedRecipe, setSelectedRecipe] = React.useState(null); // State variable to store the selected recipe
    const [favoriteMessage, setFavoriteMessage] = useState(""); // State variable to store the favorite success message
    const [alertOpen, setAlertOpen] = useState(false); // State variable to control the Snackbar visibility

    const {cachedLanding, setCachedLanding } = useContext(CachedLandingContext);
    
    async function handleSearch(searchQuery) {

        setIsLoading(true); // set isLoading to true before starting the fetch
        setCachedSearch([]); // clear the cached search results
        const params = new URLSearchParams(searchQuery);
        const response = await fetch(`/search?${params.toString()}`);
        const data = await response.json();
        //console.log('data in handleSearch', data);
        const recipesResponse = data.recipes?.results || data.recipes || [];
        //setCachedSearch(recipes); // cache the search results
        setRecipes(recipesResponse); // update the recipes state to searched recipes
        setSelectedRecipe(null); // clear the selected recipe
        setActiveTab("search"); // switch to the search tab
        setIsLoading(false); // set isLoading back to false once data has finished loading
    }

    function handleSelectedRecipe () {
      (selectedRecipe && activeTab === "search") && setSelectedRecipe(null);
    } 

    async function fetchLandingRecipes() {
      if (!cachedLanding.length) {
        console.log("Fetching")
        setIsLoading(true);     
        const response = await fetch("/landing");
        const data = await response.json();
        const { recipes } = await data;
        setCachedLanding(recipes);
        setIsLoading(false);
      }
    }

    async function fetchFavoritesRecipes() {
        if (!cachedFavorites.length) {
          setIsLoading(true);
          const userId = isLogged;
          const response = await fetch(`users/${userId}/favorites`);
          const data = await response.json();
          const { favorites } = data;
          //console.log("favorites from server: ", favorites);
          setCachedFavorites(favorites);
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


    async function updateRecipeFavorite(recipeId, isFavorite) {
      const userId = isLogged; // Assume isLogged contains the current user's ID
      const method = isFavorite ? "DELETE" : "PATCH"; // Determine the HTTP method based on the action
      const response = await fetch(`/users/${userId}/favorites/${recipeId}`, { method });
    
      // Check if the server response is not OK and set an error message
      if (!response.ok) {
        console.error(`Failed to ${isFavorite ? "remove" : "add"} recipe to favorites`);
        setFavoriteMessage(`Failed to ${isFavorite ? "remove" : "add"} recipe to favorites`);
        return;
      }
    
      // Return the favorite recipe object or the ID of the removed recipe
      const favorite = isFavorite ? { removedRecipeId: recipeId } : await response.json();
      return favorite;
    }
    
    
    // Function to update the cachedFavorites state
    function updateCachedFavorites(favorite, isAdding) {
        setCachedFavorites((prevFavorites) => {
          return isAdding
          ? [...prevFavorites, favorite] // Add the new favorite recipe
          : prevFavorites.filter((recipe) => recipe.id !== favorite.id); // Remove the recipe by ID
        });
    }

    // Function to update the cachedLanding state
    function updateCachedLanding(favorite, isAdding) {
        setCachedLanding((prevLanding) => {
          return prevLanding.map((recipe) => {
            if (recipe.id === favorite.id) {
              return { ...recipe, isFavorite: isAdding }; // Update isFavorite property
            }
            return recipe;
          });
        });
    } 

    // Function to update the selectedRecipe state
    function updateSelectedRecipe(favorite, isAdding) {
        setSelectedRecipe((prevSelected) => {
          if (prevSelected && prevSelected.id === favorite.id) {
            return { ...prevSelected, isFavorite: isAdding }; // Update isFavorite property
          }
          return prevSelected;
        });
    }

    // Function to set the favoriteMessage state based on the action and its success
    function setFavoriteMessageAction(isAdding, isSuccess, recipeName = '') {
        const message = isSuccess
          ? isAdding
            ? `${recipeName} added to favorites successfully` // Message for adding to favorites
            : `${recipeName} removed from favorites successfully` // Message for removing from favorites
          : isAdding
            ? 'Failed to add recipe to favorites' // Error message for adding
            : 'Failed to remove recipe from favorites'; // Error message for removing
        setFavoriteMessage(message) // update the favoriteMessage state
        setAlertOpen(true); // Open the alert Snackbar

    }

    // Triggered by favorite button event handler to update the favorites on recipes
    async function handleUpdateFavorites(recipeId, isFavorite) {
      const result = await updateRecipeFavorite(recipeId, isFavorite);
      const actionSuccess = result && ('favorite' in result || 'removedRecipeId' in result);

      if (actionSuccess && result.favorite) {
        // If a recipe was added, update states and set success message
        const { favorite } = result;
        updateCachedFavorites(favorite, true);
        updateCachedLanding(favorite, true);
        updateSelectedRecipe(favorite, true);
        setFavoriteMessageAction(true, true, favorite.name);
      } else if (actionSuccess && result.removedRecipeId) {
        // If a recipe was removed, find it, update states, and set success message
        const { removedRecipeId } = result;
        const removedRecipe = cachedFavorites.find(r => r.id === removedRecipeId);
        updateCachedFavorites(removedRecipe, false);
        updateCachedLanding(removedRecipe, false);
        updateSelectedRecipe(removedRecipe, false);
        setFavoriteMessageAction(false, true, removedRecipe.name);
      } else {
        // If there was an error, set the error message
        setFavoriteMessageAction(isFavorite, false);
      }
    }

    useEffect(() => {
      if (!isLogged) {
        //Reset the cached items when isLogged value changes
        setCachedLanding([]);
        setCachedFavorites([]);
        setCachedSearch([]);
      }
    }, [isLogged]);

    useEffect(() => {
      fetchLandingRecipes();
      fetchFavoritesRecipes();
    }, [activeTab]);

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
            <Box pt={4}>
              <DemoMessage />
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
                  cachedFavorites={cachedFavorites}
                  handleUpdateFavorites={handleUpdateFavorites}
                  recipesLength = {recipes.length}
                  handleSelectedRecipe = {handleSelectedRecipe}
                  cachedItems={cachedItems}
                  setCachedItems={setCachedItems}
                  onRecipeClick={handleRecipeClick}
                  recipes={recipes}
                />
              ) : (
                  <RecipeList
                    isLogged={isLogged}
                    isLoading={isLoading}
                    cachedFavorites={cachedFavorites}
                    activeTab={activeTab}
                    handleUpdateFavorites={handleUpdateFavorites}
                    onRecipeClick={handleRecipeClick}
                  />
                )
              }
            </Grid>
          </Box>
            <Footer />
        </Grid>
      </div>
    );
}