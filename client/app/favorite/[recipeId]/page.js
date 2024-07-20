'use client';

import { useContext, useState, useEffect } from 'react';
import { Grid, Box, Typography, List, ListItem, IconButton, Link } from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


import { RecipeTags } from '../../components';

import { ActiveTabContext, AuthContext } from '../../contexts'
import { ItemsProvider } from '../../contexts'

import useFavorite from '../../hooks/useFavorite';

import { ItemList, SimilarRecipes } from '../../components'

const RecipeDetails = ({ params }) => {
  
  const { isLogged } = useContext(AuthContext)
  const { activeTab } = useContext(ActiveTabContext);
  //const { state: { selectedRecipe}, dispatch: selectedDispatch } = useContext(SelectedRecipeContext);

  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const { handleUpdateFavorites } =  useFavorite();

  //const selectedRecipe = favoriteRecipes.find((recipe) => recipe.id == params.recipeId);

  async function fetchRecipe (recipeId) {
    try {
      const response = await fetch(`http://localhost:8080/recipes/${recipeId}/${isLogged}`);
      console.log("Response:", response) 
      const data = await response.json();
      const { recipe } = data;
      setSelectedRecipe(recipe)
      //selectedDispatch({ type: UPDATE_SELECTED, payload: { selected: recipe } })  
    } catch (error) {
      console.error("Error fetching recipe data:", error);
      // Handle the error appropriately (e.g., display an error message to the user)
    }
  };

  useEffect(() => {
    isLogged && fetchRecipe(params.recipeId);
  }, [])

  const handleFavoriteClick = (id, isFavorite) => {
    handleUpdateFavorites(id, isFavorite);
  };
  
  return (
    <Grid 
      container 
      justifyContent="space-between"
      pr={10} pl ={10}
    >
      <Grid item xs={12} md={6}>
        {activeTab === 'search' && (
          <Box marginBottom={2}>
            <Link onClick={() => handleSelectedRecipe(id)}>
                {recipesLength} {recipesLength === 1 ? 'recipe' : 'recipes'} found 
            </Link>
          </Box>
        )}
        <Box marginBottom={4}>
          <Typography variant="h3">{selectedRecipe?.name}</Typography>
        </Box>
        <Box>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img src={selectedRecipe?.image} alt={selectedRecipe?.title} />
            {isLogged && (
                <>
                    <IconButton
                      onClick={() => handleFavoriteClick(id, isFavorite)}
                      aria-label="add to favorites"
                      sx={{ opacity: selectedRecipe?.isFavorite ? 1 : 0.5 }}
                      style={{ position: 'absolute', top: 0, right: 0 }}
                    >
                      <FavoriteIcon
                                        sx={{
                                          fontSize: '40px',
                                          color: selectedRecipe?.isFavorite ? '#FFCB05' : 'rgba(255, 255, 255, 1)',
                                          WebkitTextStroke: '3px black',
                                        }}
                      
                      />
                    </IconButton>

                    <IconButton
                      onClick={() => handleFavoriteClick(id, isFavorite)}
                      aria-label="add to favorites"
                      sx={{ position: 'absolute', top: 0, right: 0 }}
                    >
                      <FavoriteBorderIcon
                                        sx={{
                                          fontSize: '40px',
                                          color: 'Black',
                                          WebkitTextStroke: '3px black',
                                        }}
                      
                      />
                    </IconButton>
                </> 
            )}
          </div>
        </Box> 
        <Box marginBottom={4}>
          <RecipeTags recipe={selectedRecipe} />
        </Box>
        <Box marginBottom={2}>
          <Typography variant="h4">Summary:</Typography>
        </Box>
        <Box marginBottom={4}>
          {selectedRecipe?.summary}
        </Box>
        <Box marginBottom={2}>
          <Typography variant="h4">Ingredients:</Typography>
        </Box>
        <Box marginBottom={4}>
          <List>
            {selectedRecipe?.ingredients.map((ingredient) => (
              <ListItem key={ingredient.id}>{ingredient.original_name}</ListItem>
            ))}
          </List>
        </Box>
        <Box marginBottom={2}>
          <Typography variant="h4">Instructions:</Typography>
        </Box>
        <Box marginBottom={2}>
        <div dangerouslySetInnerHTML={{ __html: selectedRecipe?.instructions }}></div>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} container justifyContent="flex-end">
        <Box display="flex" flexDirection="column">
          <Typography variant="h4"  style={{ textAlign: 'center' }}>
            <img
              src="/static/img/Walmart_logo_transparent_png.png"
              alt="Walmart Logo"
              style={{ height: '48px'}}
            />
          </Typography>
          <ItemsProvider>
            <ItemList recipe={selectedRecipe} />
          </ItemsProvider>
        </Box>
      </Grid>
        <SimilarRecipes
          recipeId={params.recipeId}
        />
    </Grid>
  );
}

export default RecipeDetails;