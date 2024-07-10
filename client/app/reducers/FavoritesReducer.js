import actionTypes from "./action-types";
const { ADD_RECIPE, REMOVE_RECIPE, FETCH_FAVORITES } = actionTypes;

const favoritesReducer = (state, action) => {
  switch (action.type) {
      case ADD_RECIPE:
          // Add the new recipe to the favoriteRecipes array
          return { ...state, favoriteRecipes: [...state.favoriteRecipes, action.payload.favorite] };

      case REMOVE_RECIPE:
          // Remove the recipe with the specified ID from favoriteRecipes
          return {
              ...state,
              favoriteRecipes: state.favoriteRecipes.filter((recipe) => recipe.id !== action.payload.removedRecipeId),
          };

      case FETCH_FAVORITES:
          // Replace entire favoriteRecipes array with new data from action payload
          return { ...state, favoriteRecipes: action.payload.favorites };

      default:
          // If action type doesn't match any defined cases, return current state
          return state;
  }
};

export default favoritesReducer;
