const landingReducer = (state, action) {
    switch (action,type) {
        case 'ADD_RECIPE':

            const recipesUpdatedAdd = state.cachedLanding.map((recipe) => {
                if (recipe.id === action.recipe.id) {
                    return { ...recipe, isFavorite: true };
                }
                return recipe;
            });
            return { ...state, cachedLanding: recipesUpdatedAdd };

        case 'REMOVE_RECIPE':

            const recipesUpdatedRemove = state.cachedLanding.map((recipe) => {
                if (recipe.id === action.recipeId) {
                    return { ...recipe, isFavorite: false };
                }
                    return recipe;
                });
                return {...state, cachedLanding: recipesUpdatedRemove };
        default:
            return state;
    }
}