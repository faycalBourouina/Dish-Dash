const { useState, useEffect } = React;
const { Grid, Box } = MaterialUI;

function Layout({ isLogged , newUser, setNewUser, handleLogin, handleSignup, handleLogout, cachedItems, setCachedItems, cachedLanding, setCachedLanding, cachedFavorites, setCachedFavorites, cachedSearch, setCachedSearch}) {
    const [activeTab, setActiveTab] = React.useState("home");
    const [isLoading, setIsLoading] = React.useState(false);
    const [recipes, setRecipes] = React.useState([]);
    const [selectedRecipe, setSelectedRecipe] = React.useState(null);
    
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
    
          // Update the cachedFavorites state by adding the new favorite recipe
          setCachedFavorites([...cachedFavorites, favorite]);
          // Update the recipes state if the active tab is favorites
          activeTab === "favorites" && setRecipes([...recipes, favorite]);
        } else {
          // Error handling for other response statuses
          console.error("Failed to add recipe to favorites");
        }
      } else {
        const deleteResponse = await fetch(`/users/${userId}/favorites/${recipeId}`, {
          method: "DELETE",
        });
    
        if (deleteResponse.ok) {
          // Favorite removed successfully
          console.log("Favorite removed");
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
        }
      }
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
            <Box pl={8} pr={8} pt={4} pb={0}>
              <Navbar 
                isLogged={isLogged}
                newUser={newUser}
                setNewUser={setNewUser}
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
            <Grid item xs={12} p={12}>
              {isLoading && <Typography variant="h4">Loading...</Typography>}
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