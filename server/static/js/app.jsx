const { useState, useContext } = React;
const { Grid } = MaterialUI;

function App() {

  return (
      <>
      <LandingRecipesProvider>
        <FavoriteRecipesProvider>
          <SelectedRecipeProvider>
            <SearchProvider>
            <Layout />
            </SearchProvider>
          </SelectedRecipeProvider>
        </FavoriteRecipesProvider>
      </LandingRecipesProvider>
    </>
  );
}