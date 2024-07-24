'use client';

import { useState, useEffect, useContext } from 'react';
import { AuthContext, FavoriteRecipesContext }  from '../contexts';

import actionTypes from '../reducers/action-types'
import { RecipeList } from '../components';

const Favorite = () => {

    const { FETCH_FAVORITES, UPDATE_SELECTED } = actionTypes;
    const { isLogged } = useContext(AuthContext);
    const { state: { favoriteRecipes }, dispatch: favoritesDispatch } = useContext(FavoriteRecipesContext)
    
    //const { activeTab }  = useContext(ActiveTabContext) // State variable to track which tab is active
    //const [recipes, setRecipes] = useState([]); // State variable to store the recipes
    //const { state: { selectedRecipe }, dispatch: selectedDispatch } = useContext(SelectedRecipeContext)
    /*function handleSelectedRecipe () {
        (selectedRecipe && activeTab === "search") && selectedDispatch({ type: UPDATE_SELECTED, payload: { selected: null } }); 
      }
    */
      async function fetchFavoritesRecipes() {
          if (!favoriteRecipes || !favoriteRecipes.length) {
            const userId = isLogged;
            const response = await fetch(`/api/users/${userId}/favorites`);
            const data = await response.json();
            const { favorites } = data;
            favoritesDispatch({ type: FETCH_FAVORITES, payload: { favorites: favorites } })
          }
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
          <RecipeList />
        </>
    );
}

export default Favorite;