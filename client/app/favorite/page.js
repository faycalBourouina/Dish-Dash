'use client';

import { useState, useEffect, useContext } from 'react';
import { AuthContext, ActiveTabContext, FavoriteRecipesContext, SelectedRecipeContext }  from '../contexts';

import actionTypes from '../reducers/action-types'
import { RecipeDetails, RecipeList } from '../components';

const Favorite = () => {

    const [isLoading, setIsLoading] = useState(false); // State variable to track whether data is being fetched 
    const [recipes, setRecipes] = useState([]); // State variable to store the recipes
   
    const { FETCH_FAVORITES, UPDATE_SELECTED } = actionTypes;
    
    const { activeTab }  = useContext(ActiveTabContext) // State variable to track which tab is active

    const { isLogged } = useContext(AuthContext);
    
    const { state: { favoriteRecipes }, dispatch: favoritesDispatch } = useContext(FavoriteRecipesContext)
    const { state: { selectedRecipe }, dispatch: selectedDispatch } = useContext(SelectedRecipeContext)

    function handleSelectedRecipe () {
        (selectedRecipe && activeTab === "search") && selectedDispatch({ type: UPDATE_SELECTED, payload: { selected: null } }); 
      }
  
      async function fetchFavoritesRecipes() {
          if (!favoriteRecipes || !favoriteRecipes.length) {
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
          favoritesDispatch({ type: FETCH_FAVORITES, payload: { favorites: [] } });
        } else if (isLogged) {
          // Fetch favorites only when the user is logged in
          fetchFavoritesRecipes();
        }
      }, [isLogged]);
      


    return (
        <>

        This Favorite Tab
            {selectedRecipe ? (
                <RecipeDetails
                recipesLength = {recipes.length}
                handleSelectedRecipe = {handleSelectedRecipe}
                recipes={recipes}
                
                />
            ) : (
                <RecipeList
                    isLoading={isLoading}
                />
                )
            }
        </>
    );
}

export default Favorite;