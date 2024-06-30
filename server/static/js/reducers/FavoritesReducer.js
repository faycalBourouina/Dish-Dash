const favoritesReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_RECIPE':
        return { ...state, cachedFavorites: [...state.cachedFavorites, action.payload.favorite] };
  
      case 'REMOVE_RECIPE':
        console.log("Removed Recipe id: ", action.payload.removedRecipeId)
        return { ...state, cachedFavorites: state.cachedFavorites.filter((recipe) => recipe.id !== action.payload.removedRecipeId) };
      
      case 'FETCH_FAVORITES':
        return { ...state, cachedFavorites: action.payload.favorites };
      default:
        return state;
    }
  };
  