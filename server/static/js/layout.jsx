function Layout() {
    const [recipes, setRecipes] = React.useState([]);
    const [selectedRecipe, setSelectedRecipe] = React.useState(null);
    
    async function handleSearch(searchQuery) {
        setSelectedRecipe(null); // clear the selected recipe
        const params = new URLSearchParams(searchQuery);
        const response = await fetch(`/search?${params.toString()}`);
        const data = await response.json();
        console.log(data);
        const { recipes: { results } } = data;
        setRecipes(results);
    }
    
    async function handleRecipeClick(recipe) {
        const response = await fetch(`/recipes/${recipe.id}`);
        const data = await response.json();
        const recipe_details = await data.recipe;
        setSelectedRecipe(recipe_details);
    }
    
    return (
      <div>
        <div className="container">
          <SearchForm onSearch={handleSearch} />
          <div>
            {selectedRecipe ? (
              <RecipeDetails recipe={selectedRecipe} />
            ) : (
              <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick} />
            )}
          </div>
        </div>
      </div>
    );
}