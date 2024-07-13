'use client';

import { useState, useEffect, useContext } from 'react';
import { AuthContext, ActiveTabContext, SearchContext, LandingRecipesContext, FavoriteRecipesContext, SelectedRecipeContext }  from './contexts';

import actionTypes from './reducers/action-types'
import { RecipeDetails, RecipeList } from './components';


function Home() {


    const [isLoading, setIsLoading] = useState(false); // State variable to track whether data is being fetched 
    const [recipes, setRecipes] = useState([]); // State variable to store the recipes
   
    const { FETCH_FAVORITES, FETCH_LANDING, UPDATE_SELECTED } = actionTypes;
    
    const { activeTab, setActiveTab }  = useContext(ActiveTabContext) // State variable to track which tab is active

    const { setCachedSearch } = useContext(SearchContext);
    const { isLogged } = useContext(AuthContext);
    
    const { dispatch: landingDispatch } = useContext(LandingRecipesContext);
    const { state: { favoritesRecipes }, dispatch: favoritesDispatch } = useContext(FavoriteRecipesContext)
    const { state: { selectedRecipe }, dispatch: selectedDispatch } = useContext(SelectedRecipeContext)


    async function handleSearch(searchQuery) {

        setIsLoading(true); // set isLoading to true before starting the fetch
        setCachedSearch([]); // clear the cached search results
        const params = new URLSearchParams(searchQuery);
        const response = await fetch(`/api/search?${params.toString()}`);
        const data = await response.json();
        const recipesResponse = data.recipes?.results || data.recipes || [];
        setRecipes(recipesResponse); // update the recipes state to searched recipes

        selectedDispatch({ type: UPDATE_SELECTED, payload: { selected: null} });        
        setActiveTab("search"); // switch to the search tab
        setIsLoading(false); // set isLoading back to false once data has finished loading
    }

    function handleSelectedRecipe () {
      (selectedRecipe && activeTab === "search") && selectedDispatch({ type: UPDATE_SELECTED, payload: { selected: null } }); 
    }

    async function fetchLandingRecipes() {
        setIsLoading(true);     
        const response = await fetch("/api/landing");
        const data = await response.json();
        const { recipes } = await data;
       
        landingDispatch({ type: FETCH_LANDING, payload: { landing: recipes } })
        setIsLoading(false);
    }

    async function fetchFavoritesRecipes() {
        if (!favoritesRecipes || !favoritesRecipes.length) {
          setIsLoading(true);
          const userId = isLogged;
          const response = await fetch(`/api/users/${userId}/favorites`);
          const data = await response.json();
          const { favorites } = data;
          
          favoritesDispatch({ type: FETCH_FAVORITES, payload: { favorites: favorites } })
          setIsLoading(false);
        }
    }
    
    async function handleRecipeClick(recipe) {
      const response = await fetch(`/api/recipes/${recipe.id}`);
      const data = await response.json();
      const { ingredients } = await data.recipe;
      recipe.ingredients = ingredients;
      selectedDispatch({ type: UPDATE_SELECTED, payload: { selected: recipe } });
    }

  
    useEffect(() => {
      // Reset the cached search when the user is not logged in
      if (!isLogged) {
        setCachedSearch([]);
        favoritesDispatch({ type: FETCH_FAVORITES, payload: { favorites: [] } });
      } else if (isLogged) {
        // Fetch favorites only when the user is logged in
        fetchFavoritesRecipes();
      }
      // fetch landing recipes everytime isLogged updates
      fetchLandingRecipes();
    }, [isLogged]);
    

    return (
        <>
            {selectedRecipe ? (
                <RecipeDetails
                recipesLength = {recipes.length}
                handleSelectedRecipe = {handleSelectedRecipe}
                onRecipeClick={handleRecipeClick}
                recipes={recipes}
                
                />
            ) : (
                <RecipeList
                    isLoading={isLoading}
                    onRecipeClick={handleRecipeClick}
                />
                )
            }
        </>
    );
}

export default Home;