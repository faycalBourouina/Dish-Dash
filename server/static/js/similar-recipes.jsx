function SimilarRecipes({ isLogged, handleUpdateFavorites, recipeId, onRecipeClick }) {
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(false);
  const [recipes, setRecipes] = useState([]);

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

  console.log('recipes in SimilarRecipes', recipes);

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
                    isLogged={isLogged}
                    handleUpdateFavorites={handleUpdateFavorites}
                    recipe={recipe}
                    onRecipeClick={onRecipeClick}
                />
            ))}
            </Grid>
        )}
    </Grid>
  );
}
