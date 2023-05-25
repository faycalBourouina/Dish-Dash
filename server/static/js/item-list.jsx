const ItemList = ({ recipe, cachedItems, setCachedItems }) => {
  
  const [items, setItems] = useState([]);

  const recipeId = recipe.id;

  async function fetchItems(recipeId) {

    // Check if items are already cached
    if (cachedItems[recipeId]) {
      setItems(cachedItems[recipeId]);
      return;
    }

    // Get recipe ingredients
    const ingredients = recipe.ingredients;

    // Check if ingredients are empty
    if (ingredients.length === 0) {
      setItems([]);
      return;
    }

    
    // Convert ingredients to query string
    const queryParams = new URLSearchParams({ ingredients: JSON.stringify(ingredients) }).toString();

    // Fetch items from server
    const response = await fetch(`/recipes/${recipeId}/items?${queryParams}`);
    const data = await response.json();
    const { items } = data;
    
    // Update cachedItems with fetched items
    setCachedItems(prevCachedItems => ({
      ...prevCachedItems,
      [recipeId]: items
    }));

    setItems(items);
  }

  useEffect(() => {
    // Fetch items only if recipeId is provided
    if (recipeId) {
      fetchItems(recipeId);
    }
  }, [recipeId]);

  return (
    <div>
      <h2>Buy these recipe ingredients from Walmart:</h2>
      {items.map((item) => (
        <ItemDetails key={item.id} item={item} />
      ))}
    </div>
  );
};