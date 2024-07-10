import { ADD_RECIPE, REMOVE_RECIPE, UPDATE_SELECTED } from './action-types';

const selectedReducer = (state, action) => {
    switch (action.type) {
        case ADD_RECIPE:
            // Mark the selected recipe as a favorite
            return { ...state, selectedRecipe: { ...state.selectedRecipe, isFavorite: true } };

        case REMOVE_RECIPE:
            // Remove the selected recipe from favorites
            return { ...state, selectedRecipe: { ...state.selectedRecipe, isFavorite: false } };

        case UPDATE_SELECTED:
            // Update the entire selected recipe with new data
            return { ...state, selectedRecipe: action.payload.selected };

        default:
            // If action type doesn't match any defined cases, return current state
            return state;
    }
};

export default selectedReducer;
