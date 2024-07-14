'use client';

import { useContext } from "react";
import { Grid, Box, Typography } from '@mui/material';
import { LandingRecipesContext, FavoriteRecipesContext, ActiveTabContext } from '../contexts';
import { RecipeListSkeleton, RecipeItem } from "./";

const RecipeList = ({ isLoading, onRecipeClick }) => {

  const { state: { landingRecipes } } = useContext(LandingRecipesContext);
  const { state: { favoriteRecipes } } = useContext(FavoriteRecipesContext);
  const { activeTab } = useContext(ActiveTabContext)
  
  // Determine which recipes to display based on the activeTab
  const recipes = activeTab === "favorites" ? favoriteRecipes : landingRecipes;

  if (isLoading) {
    return <RecipeListSkeleton />;
  }
  else if (!isLoading) {
    return (
      <div>
        {recipes?.length === 0 ? (
        <Grid container spacing={8} pl={40}>
          <Box 
            display="flex" 
            justifyContent="center"
            alignItems="center"
            style={{ height: '100%'}}
          >
            <img
              src="static/img/no_recipe_found.png"
              alt="No results found"
              style={{ width: '85%', height: '85%' }}
            />
          </Box>
        </Grid>
        ) : (
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
        )}
      </div>
    );
   }
}

export default RecipeList;