import { ADD_RECIPE, REMOVE_RECIPE, FETCH_LANDING } from './action-types';


const landingReducer = (state, action) => {
    switch (action.type) {
        case ADD_RECIPE:
            // Map over existing recipes and mark the specified recipe as a favorite.
            const recipesUpdatedAdd = state.landingRecipes.map((recipe) => {
                if (recipe.id === action.payload.favorite.id) {
                    return { ...recipe, isFavorite: true };
                }
                return recipe;
            });
            // Return updated state with modified landingRecipes array.
            return { ...state, landingRecipes: recipesUpdatedAdd };

        case REMOVE_RECIPE:
            // Map over existing recipes and remove the specified recipe from favorites.
            const recipesUpdatedRemove = state.landingRecipes.map((recipe) => {
                if (recipe.id === action.payload.removedRecipeId) {
                    return { ...recipe, isFavorite: false };
                }
                return recipe;
            });
            // Return updated state with modified landingRecipes array.
            return { ...state, landingRecipes: recipesUpdatedRemove };

        case FETCH_LANDING:
            // Replace entire landingRecipes array with new data from action payload.
            return { ...state, landingRecipes: action.payload.landing };

        default:
            // If action type doesn't match any defined cases, return current state.
            return state;
    }
};
