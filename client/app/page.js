'use client';

import { useState, useEffect, useContext } from 'react';
import { ActiveTabContext, SearchContext, LandingRecipesContext }  from './contexts';

import actionTypes from './reducers/action-types'
import { RecipeList } from './components';


function Home() {
   
    const { FETCH_LANDING } = actionTypes;
    
    const { setActiveTab }  = useContext(ActiveTabContext) // State variable to track which tab is active

    const { setCachedSearch } = useContext(SearchContext);    
    const { dispatch: landingDispatch } = useContext(LandingRecipesContext);
   
    //const { state: { selectedRecipe }, dispatch: selectedDispatch } = useContext(SelectedRecipeContext)


       /*
    function handleSelectedRecipe () {
      (selectedRecipe && activeTab === "search") && selectedDispatch({ type: UPDATE_SELECTED, payload: { selected: null } }); 
    }
    */

    async function handleSearch(searchQuery) {
        setCachedSearch([]); // clear the cached search results
        const params = new URLSearchParams(searchQuery);
        const response = await fetch(`/api/search?${params.toString()}`);
        const data = await response.json();
        const recipesResponse = data.recipes?.results || data.recipes || [];
        setRecipes(recipesResponse); // update the recipes state to searched recipes

        //selectedDispatch({ type: UPDATE_SELECTED, payload: { selected: null} });        
        setActiveTab("search"); // switch to the search tab
    }

    async function fetchLandingRecipes() {
        const response = await fetch("/api/landing");
        const data = await response.json();
        const { recipes } = await data;
       
        landingDispatch({ type: FETCH_LANDING, payload: { landing: recipes } })
    }
  
    useEffect(() => {
      // Reset the cached search when the user is not logged in
      fetchLandingRecipes();
    }, []);
    

    return (
        <>
          <RecipeList />
        </> 
    );
}
export default Home;