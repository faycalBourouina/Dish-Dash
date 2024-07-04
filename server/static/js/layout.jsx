const { useState, useEffect, useContext } = React;
const { Grid, Box } = MaterialUI;

function Layout() {
    const [activeTab, setActiveTab] = React.useState("home"); // State variable to track which tab is active
    const [isLoading, setIsLoading] = React.useState(false); // State variable to track whether data is being fetched 
    const [recipes, setRecipes] = React.useState([]); // State variable to store the recipes
   
    const { setCachedSearch } = useContext(SearchContext);
    const { isLogged } = useContext(AuthContext);
    
    const { state: { cachedLanding }, dispatch: landingDispatch } = useContext(LandingRecipesContext);
    const { state: { favoritesRecipes }, dispatch: favoritesDispatch } = useContext(FavoriteRcipesContext)
    const { state: { selectedRecipe }, dispatch: selectedDispatch } = useContext(SelectedRecipeContext)


    async function handleSearch(searchQuery) {

        setIsLoading(true); // set isLoading to true before starting the fetch
        setCachedSearch([]); // clear the cached search results
        const params = new URLSearchParams(searchQuery);
        const response = await fetch(`/search?${params.toString()}`);
        const data = await response.json();
        const recipesResponse = data.recipes?.results || data.recipes || [];
        setRecipes(recipesResponse); // update the recipes state to searched recipes

        selectedDispatch({ type: 'UPDATE_SELECTED', payload: { selected: null} });        
        setActiveTab("search"); // switch to the search tab
        setIsLoading(false); // set isLoading back to false once data has finished loading
    }

    function handleSelectedRecipe () {
      (selectedRecipe && activeTab === "search") && selectedDispatch({ type: 'UPDATE_SELECTED', payload: { selected: null } }); 
    }

    async function fetchLandingRecipes() {
      if (!cachedLanding.length) {
        console.log("Fetching")
        setIsLoading(true);     
        const response = await fetch("/landing");
        const data = await response.json();
        const { recipes } = await data;
       
        landingDispatch({ type: 'FETCH_LANDING', payload: { landing: recipes } })
        setIsLoading(false);
      }
    }

    async function fetchFavoritesRecipes() {
        if (!favoritesRecipes || !favoritesRecipes.length) {
          setIsLoading(true);
          const userId = isLogged;
          const response = await fetch(`users/${userId}/favorites`);
          const data = await response.json();
          const { favorites } = data;
          
          favoritesDispatch({ type: 'FETCH_FAVORITES', payload: { favorites: favorites } })
          setIsLoading(false);
        }
    }
    
    async function handleRecipeClick(recipe) {
      const response = await fetch(`/recipes/${recipe.id}`);
      const data = await response.json();
      const { ingredients } = await data.recipe;
      recipe.ingredients = ingredients;
      selectedDispatch({ type: 'UPDATE_SELECTED', payload: { selected: recipe } });
    }

    useEffect(() => {
      if (!isLogged) {
        //Reset the cached when isLogged value changes
        console.log("!isLogged useEffect getting called")
        //landingDispatch({ type: 'ADD_RECIPE', payload: { landing: [] } })        
        favoritesDispatch({ type: 'FETCH_FAVORITES', payload: { favorites: [] } })
        setCachedSearch([]);
      }
    }, [isLogged]);

    useEffect(() => {
      console.log("fetch recipes useEffect getting called")
      fetchLandingRecipes();
      isLogged && fetchFavoritesRecipes();
    }, []);

    return (
      <div>
        <Grid container direction="column">
          <Grid item xs={12}>
                <FavoriteMessageBar />
            <Box pl={8} pr={8} pt={4} pb={0}>
                <Navbar 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
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
                  activeTab={activeTab}
                  recipesLength = {recipes.length}
                  handleSelectedRecipe = {handleSelectedRecipe}
                  onRecipeClick={handleRecipeClick}
                  recipes={recipes}
                />
              ) : (
                  <RecipeList
                    isLoading={isLoading}
                    activeTab={activeTab}
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