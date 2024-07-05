const selectedReducer = (state, action) => {
    switch (action.type) {
        case ADD_RECIPE:
            return { ...state, selectedRecipe: { ...state.selectedRecipe, isFavorite: true }};

        case REMOVE_RECIPE:
            return { ...state, selectedRecipe: { ...state.selectedRecipe, isFavorite: false }};

        case UPDATE_SELECTED:
            return { ...state, selectedRecipe: action.payload.selected }
        default:
            return state;
    }
}