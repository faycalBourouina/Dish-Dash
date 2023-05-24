const { useState, useEffect } = React;

const ItemList = ({ recipeId }) => {
  const [items, setItems] = useState([]);
  
  async function fetchItems(recipeId) {
    const response = await fetch(`/recipes/${recipeId}/items`);
    const data = await response.json();
    const { items } = data;
    setItems(items);
  }

  useEffect(() => {
    fetchItems(recipeId);
    console.log("items fetched", items);
  }, [recipeId]);

  return (
    <div>
      <h2>Buy this recipe ingredients from Walmart:</h2>
      {
        items.map( item => {
          return (
            <ItemDetails key={item.id} item={item} />
          );
        }
      )}
    </div>
  );
};