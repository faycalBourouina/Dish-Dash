import { useContext } from 'react';
import { Grid, Box, Typography, List, ListItem, IconButton, Link } from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { RecipeTags } from './';

import { ActiveTabContext, AuthContext, SelectedRecipeContext } from '../contexts';
import { ItemsProvider } from '../contexts';

import useFavorite from '../hooks/useFavorite';

import { ItemList, SimilarRecipes } from './';

const RecipeDetails = ({ recipesLength, handleSelectedRecipe, onRecipeClick}) => {
  
  const { isLogged } = useContext(AuthContext)
  const { state: { selectedRecipe } } = useContext(SelectedRecipeContext)
  const { activeTab } = useContext(ActiveTabContext)

  const { handleUpdateFavorites } =  useFavorite();

  const { id, title, image, instructions, ingredients, summary, isFavorite} = selectedRecipe;

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
          <Typography variant="h3">{title || selectedRecipe.name}</Typography>
        </Box>
        <Box>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img src={image} alt={title} />
            {isLogged && (
                <>
                    <IconButton
                      onClick={() => handleFavoriteClick(id, isFavorite)}
                      aria-label="add to favorites"
                      sx={{ opacity: isFavorite ? 1 : 0.5 }}
                      style={{ position: 'absolute', top: 0, right: 0 }}
                    >
                      <FavoriteIcon
                                        sx={{
                                          fontSize: '40px',
                                          color: isFavorite ? '#FFCB05' : 'rgba(255, 255, 255, 1)',
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
          {summary}
        </Box>
        <Box marginBottom={2}>
          <Typography variant="h4">Ingredients:</Typography>
        </Box>
        <Box marginBottom={4}>
          <List>
            {ingredients.map((ingredient) => (
              <ListItem key={ingredient.id}>{ingredient.original_name}</ListItem>
            ))}
          </List>
        </Box>
        <Box marginBottom={2}>
          <Typography variant="h4">Instructions:</Typography>
        </Box>
        <Box marginBottom={2}>
        <div dangerouslySetInnerHTML={{ __html: instructions }}></div>
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
          recipeId={selectedRecipe.id}
          onRecipeClick={onRecipeClick}
        />
    </Grid>
  );
}

export default RecipeDetails;