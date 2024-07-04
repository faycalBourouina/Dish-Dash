const favoritesReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_RECIPE':
        return { ...state, favoriteRecipes: [...state.favoriteRecipes, action.payload.favorite] };
  
      case 'REMOVE_RECIPE':
        return { ...state, favoriteRecipes: state.favoriteRecipes.filter((recipe) => recipe.id !== action.payload.removedRecipeId) };
      
      case 'FETCH_FAVORITES':
        console.log("favorites in reducer", action.payload.favorites)
        return { ...state, favoriteRecipes: action.payload.favorites };
      default:
        return state;
    }
  };
  