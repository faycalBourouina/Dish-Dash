function Search() {
    const [recipes, setRecipes] = React.useState([]);
    
    async function handleSearch(searchQuery) {
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
        setSelectedRecipe(data);
    }
    
    return (
        <div>
            <div className="container">
                <SearchForm onSearch={handleSearch} />
                <div>
                    <ul>
                        {
                            recipes.map((recipe, index) => (
                                <li key={recipe.id} onClick={() => handleRecipeClick(recipe)}>
                                    <h3> {recipe.title} </h3>
                                    <img src={recipe.image} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
                

            </div>
        </div>
    );
}