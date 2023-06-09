const { useRef } = React;

const testItems =
[
    {
        "best_seller": true,
        "description": "<li>Kosher dairy</li><li>No trans fat</li><li>Naturally gluten-free food</li>",
        "images": [
            "https://i5.walmartimages.com/asr/1045c3ae-6f22-45df-b271-ac26ee21dff0_2.98baf618acab7c5c605d0b7931ad8e41.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff"
        ],
        "item_id": "10450339",
        "link": "https://www.walmart.com/ip/Great-Value-Heavy-Whipping-Cream-16-Oz/10450339?athbdg=L1600",
        "main_image": "https://i5.walmartimages.com/asr/1045c3ae-6f22-45df-b271-ac26ee21dff0_2.98baf618acab7c5c605d0b7931ad8e41.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff",
        "name": "heavy cream",
        "price": 2.78,
        "product_id": "78I9PUULOV7S",
        "rating": 0,
        "ratings_total": 0,
        "shipping": false,
        "title": "Great Value Heavy Whipping Cream, 16 Oz"
    },
    {
        "best_seller": true,
        "description": "<li>AUTHENTIC ASIAN CUISINE: Thai Kitchen Unsweetened Coconut Milk makes it easy to bring the flavours of both East and Southeast Asian cuisines right to your own kitchen</li>",
        "images": [
            "https://i5.walmartimages.com/asr/1415f1ea-8742-4645-b82f-575cd1a779ce_1.65b17176551ee1adf1c665c2cde06baa.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff"
        ],
        "item_id": "10309672",
        "link": "https://www.walmart.com/ip/Thai-Kitchen-Gluten-Free-Unsweetened-Coconut-Milk/10309672?athbdg=L1600",
        "main_image": "https://i5.walmartimages.com/asr/1415f1ea-8742-4645-b82f-575cd1a779ce_1.65b17176551ee1adf1c665c2cde06baa.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff",
        "name": "coconut milk",
        "price": 2.98,
        "product_id": "1KZSHGC80ZJB",
        "rating": 4.4,
        "ratings_total": 294,
        "shipping": true,
        "title": "Thai Kitchen Gluten Free Unsweetened Coconut Milk"
    },
    {
        "description": "Great News! Oodles and oodles of noodles all year long. The Manischewitz family knows you love egg noodles because they're quick and easy to prepare and are delicious. Whether you're sensitive to",
        "images": [
            "https://i5.walmartimages.com/asr/b01ebb02-a16b-41aa-b7a3-f7ea96645e16.9e916c0de5f9310c932e334611ee1528.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff"
        ],
        "item_id": "741907359",
        "link": "https://www.walmart.com/ip/Manischewitz-Gluten-Free-Wide-Egg-Noodles-3-Pack-Yolk-Free-Kosher-For-Passover-and-All-Year-Round-Use/741907359",
        "main_image": "https://i5.walmartimages.com/asr/b01ebb02-a16b-41aa-b7a3-f7ea96645e16.9e916c0de5f9310c932e334611ee1528.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff",
        "name": "yolks",
        "price": 24.69,
        "product_id": "2AOFF3OW51BZ",
        "rating": 1,
        "ratings_total": 1,
        "shipping": true,
        "title": "Manischewitz Gluten Free Wide Egg Noodles 3 Pack Yolk Free, Kosher For Passover and All Year Round Use"
    },
    {
        "description": "Details:LAKANTO POWDERED MONKFRUIT SWEETENER WITH ERYTHRITOL IS A SUGAR-FREE 2:1 REPLACEMENT FOR POWDERED SUGAR. WITH DOUBLE THE SWEETNESS OF REGULAR POWDERED SUGAR, AND THE SAME TEXTURE AS POWDERED",
        "images": [
            "https://i5.walmartimages.com/asr/daf57fa0-ae7d-4911-adf7-eb2f08aed365.f335f62f93e7922af1e24f76af05eac1.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff"
        ],
        "item_id": "3977062110",
        "link": "https://www.walmart.com/ip/Lakanto-Powdered-Monkfruit-Sweetener-With-Erythritol-Case-of-8-1-LB/3977062110",
        "main_image": "https://i5.walmartimages.com/asr/daf57fa0-ae7d-4911-adf7-eb2f08aed365.f335f62f93e7922af1e24f76af05eac1.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff",
        "name": "erythritol",
        "price": 134.56,
        "product_id": "3VNTM04JY2LE",
        "rating": 0,
        "ratings_total": 0,
        "shipping": true,
        "title": "Lakanto Powdered Monkfruit Sweetener With Erythritol - Case of 8 - 1 LB"
    },
    {
        "description": "<li>Best when enjoyed at room temperature</li><li>Light, refreshing taste</li><li>Healthy sweet treat</li>",
        "images": [
            "https://i5.walmartimages.com/asr/4e7dab6a-c54b-48f7-9bd2-57f5d211501d_1.3ba50bfdf1c7f082056c0f5022edf182.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff"
        ],
        "item_id": "44391605",
        "link": "https://www.walmart.com/ip/Fresh-Strawberries-1-lb/44391605?athbdg=L1200",
        "main_image": "https://i5.walmartimages.com/asr/4e7dab6a-c54b-48f7-9bd2-57f5d211501d_1.3ba50bfdf1c7f082056c0f5022edf182.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff",
        "name": "strawberries",
        "popular_pick": true,
        "price": 1.48,
        "product_id": "6ED4F8QT0VUS",
        "rating": 0,
        "ratings_total": 0,
        "shipping": false,
        "title": "Fresh Strawberries, 1 lb"
    },
    {
        "description": "<li>Shenandoah Growers Organic Fresh Potted Basil</li><li>Amazing flavor</li><li>Organic and GMO-free</li>",
        "images": [
            "https://i5.walmartimages.com/asr/7151c4f8-362b-410e-8108-cafe05e563a1_1.45e15e5ebe9d5b6966988fbc151c274e.png?odnHeight=180&odnWidth=180&odnBg=ffffff"
        ],
        "item_id": "136791908",
        "link": "https://www.walmart.com/ip/Shenandoah-Growers-Organic-Fresh-Potted-Basil-1-Each/136791908",
        "main_image": "https://i5.walmartimages.com/asr/7151c4f8-362b-410e-8108-cafe05e563a1_1.45e15e5ebe9d5b6966988fbc151c274e.png?odnHeight=180&odnWidth=180&odnBg=ffffff",
        "name": "basil",
        "price": 2.98,
        "product_id": "6AF6CGE5M6LJ",
        "rating": 0,
        "ratings_total": 0,
        "shipping": false,
        "title": "Shenandoah Growers Organic Fresh Potted Basil, 1 Each"
    },
    {
        "description": "<li>Great source of vitamin C</li><li>Use to add zest & flavor to your meals & beverages</li><li>Add to your iced or hot tea</li>",
        "images": [
            "https://i5.walmartimages.com/asr/f025c57c-13e1-4a1a-ac81-0695aaf2473d.7f3c9f067735c2730223c9147a646f7c.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff"
        ],
        "item_id": "41752773",
        "link": "https://www.walmart.com/ip/Lemons-Each/41752773",
        "main_image": "https://i5.walmartimages.com/asr/f025c57c-13e1-4a1a-ac81-0695aaf2473d.7f3c9f067735c2730223c9147a646f7c.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff",
        "name": "juice of lemon",
        "price": 0.58,
        "product_id": "6U68RSWELR9C",
        "rating": 0,
        "ratings_total": 0,
        "shipping": false,
        "title": "Lemons, Each"
    },
    {
        "description": "<li>Brand: Generic</li><li>Package Information: Jar</li><li>Specialty: NATURAL</li><li>Package Weight: 0.38 Kilograms</li><li>NATURAL GOODNESS INSIDE Dehydrated apples, lemons, and apple pie infused</li>",
        "images": [
            "https://i5.walmartimages.com/asr/1f2b5237-6420-48b8-905e-6abf342ce256.ead6db2fb74de42cc048705ee35e43e3.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff"
        ],
        "item_id": "1773875886",
        "link": "https://www.walmart.com/ip/Mckinnon-S-Dry-Craft-Cocktails-Dehydrated-Fruit-And-Herbs-Diy-Mixology-Infusion-Kit-Mason-Jar-Serves-8-16-Drinks-Handmade-In-The-Usa-Hot-Toddy-1-Jar/1773875886",
        "main_image": "https://i5.walmartimages.com/asr/1f2b5237-6420-48b8-905e-6abf342ce256.ead6db2fb74de42cc048705ee35e43e3.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff",
        "name": "vodka",
        "price": 29.99,
        "product_id": "3ETO52CFH8G2",
        "rating": 0,
        "ratings_total": 0,
        "shipping": true,
        "title": "MckinnonS Dry Craft Cocktails | Dehydrated Fruit And Herbs | Diy Mixology | Infusion Kit | Mason Jar Serves 8  16 Drinks | Handmade In The Usa (Hot Toddy, 1-Jar)"
    }
]
const ItemList = ({ recipe, cachedItems, setCachedItems }) => {
  
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [items, setItems] = useState([]);

  const itemListRef = useRef(null);
  const [itemListTop, setItemListTop] = useState(0);
  const [itemListLeft, setItemListLeft] = useState(0);

  useEffect(() => {
    if (itemListRef.current) {
      const rect = itemListRef.current.getBoundingClientRect();
      setItemListTop(rect.top);
      setItemListLeft(rect.left);
    }
  }, []);

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

    // Set loading state to true before fetching items
    setIsLoadingItems(true);
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
    setIsLoadingItems(false);
  }

  useEffect(() => {
    // Fetch items only if recipeId is provided
    if (recipeId) {
      fetchItems(recipeId);
    }
  }, [recipeId]);
  
  return (
    <>
      <div 
        className="ScrollList"
        ref={itemListRef}
        style={{
            position: 'sticky',
            top: itemListTop, 
            top: 0, 
            height: '1500px', 
            overflow: 'auto'
        }}
      >
        {isLoadingItems ? (
          <ItemListSkeleton />
          ) : (
          items.map((item) => (
            <ItemDetails key={item.id} item={item} />
          ))
        )}
      </div>
    </>
  );
};