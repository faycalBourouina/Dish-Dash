const landingReducer = (state, action) => {
    switch (action.type) {
        case ADD_RECIPE:

            const recipesUpdatedAdd = state.cachedLanding.map((recipe) => {
                if (recipe.id === action.payload.favorite.id) {
                    return { ...recipe, isFavorite: true };
                }
                return recipe;
            });
            return { ...state, cachedLanding: recipesUpdatedAdd };

        case REMOVE_RECIPE:

            const recipesUpdatedRemove = state.cachedLanding.map((recipe) => {
                if (recipe.id === action.payload.removedRecipeId) {
                    return { ...recipe, isFavorite: false };
                }
                    return recipe;
                });
                return {...state, cachedLanding: recipesUpdatedRemove };

        case FETCH_LANDING:
            return { ...state, cachedLanding: action.payload.landing };

        default:
            return state;
    }
}