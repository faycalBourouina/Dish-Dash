const { useState, useContext } = React;
const { Grid } = MaterialUI;

function App() {

  return (
      <>
      <CachedLandingProvider>
        <CachedFavoritesProvider>
          <SelectedRecipeProvider>
            <SearchProvider>
            <Layout />
            </SearchProvider>
          </SelectedRecipeProvider>
        </CachedFavoritesProvider>
      </CachedLandingProvider>
    </>
  );
}