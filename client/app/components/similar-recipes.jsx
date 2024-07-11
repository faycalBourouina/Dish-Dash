'use client';

import { useState, useContext, useEffect } from 'react';
import { FavoriteRecipesContext } from '../contexts';

import { RecipeListSkeleton, RecipeItem } from './';

const SimilarRecipes = ({ recipeId, onRecipeClick }) => {
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const { state: { favoriteRecipes }} = useContext(FavoriteRecipesContext)


  useEffect(() => {
    async function fetchSimilarRecipes() {
      setIsLoadingSimilar(true);
      const response = await fetch(`/recipes/${recipeId}/similar`);
      const data = await response.json();
      setRecipes(data.recipes);
      setIsLoadingSimilar(false);
    }

    fetchSimilarRecipes();
  }, []);


  useEffect(() => {
    // Function to update the recipes with favorites information
    function updateRecipesWithFavorites() {
      const updatedRecipes = recipes.map((recipe) => {
        // Find if the current recipe is in favoriteRecipes 
        const favoriteRecipe = favoriteRecipes.find(fav => fav.id === recipe.id);
        // If it is, return the favorite recipe, otherwise return the original recipe
        return favoriteRecipe ||  { ...recipe, isFavorite: false }
      });
      setRecipes(updatedRecipes); // Update the state with the new recipes array
    }

    // Call the function to update recipes whenever favoriteRecipes changes
    updateRecipesWithFavorites();
  }, [favoriteRecipes]); // Added favoriteRecipes as a dependency


  return (
    < Grid
        container justifyContent="space-between"
        pt={10}
    >
        <Box marginBottom={2}>
            <Typography variant="h4">Similar Recipes:</Typography>
        </Box>
        {isLoadingSimilar ? (
            <RecipeListSkeleton num={4} />
        ) : (
            <Grid container spacing={2}>
            {recipes.map((recipe) => (
                <RecipeItem
                    key={recipe.id}
                    recipe={recipe}
                    onRecipeClick={onRecipeClick}
                />
            ))}
            </Grid>
        )}
    </Grid>
  );
}
export default SimilarRecipes;