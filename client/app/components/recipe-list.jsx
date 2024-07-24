'use client';

import { useContext } from "react";
import { Grid, Box, Typography } from '@mui/material';
import { LandingRecipesContext, FavoriteRecipesContext, ActiveTabContext } from '../contexts';
import { RecipeItem } from "./";

const RecipeList = ({ onRecipeClick }) => {

  const { state: { landingRecipes } } = useContext(LandingRecipesContext);
  const { state: { favoriteRecipes } } = useContext(FavoriteRecipesContext);
  const { activeTab } = useContext(ActiveTabContext)
  
  // Determine which recipes to display based on the activeTab
  const recipes = activeTab === "favorites" ? favoriteRecipes : landingRecipes;
    return (
      <div>
            {activeTab === 'search' && (
              <Box pb={2}>
                  <Typography variant="h5" gutterBottom>
                    {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}{' '}
                    found:
                  </Typography>
              </Box>
            )}
            <Grid container spacing={8}>
              {recipes.map((recipe) => (
                <RecipeItem
                  key={recipe.id}
                  recipe={recipe}
                  onRecipeClick={onRecipeClick}
                  summary={recipe.summary}
                />
              ))}
            </Grid>
      </div>
    );
}

export default RecipeList;