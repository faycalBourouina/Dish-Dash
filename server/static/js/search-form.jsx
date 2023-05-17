const { useState } = React;

function SearchForm() {
  const [query, setQuery] = useState('');
  const [diet, setDiet] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [intolerances, setIntolerances] = useState([]);
  const [includeIngredients, setIncludeIngredients] = useState([]);
  const [type, setType] = useState([]);
  const [maxReadyTime, setMaxReadyTime] = useState('');

  const diets = ['Vegetarian', 'Vegan', 'Ketogenic', 'Paleo'];
  const cuisines = ['Italian', 'Chinese', 'Indian', 'Mexican'];
  const intoleranceOptions = ['Dairy', 'Egg', 'Gluten', 'Peanut'];
  const typeOptions = ['Main Course', 'Side Dish', 'Dessert', 'Appetizer'];

  const handleIntoleranceChange = event => {
    const { value } = event.target;
    setIntolerances(intolerances =>
      intolerances.includes(value)
        ? intolerances.filter(i => i !== value)
        : [...intolerances, value]
    );
  };

  const handleIncludeIngredientsChange = event => {
    setIncludeIngredients(event.target.value.split(','));
  };

  const handleTypeChange = event => {
    const { value } = event.target;
    setType(type =>
      type.includes(value) ? type.filter(t => t !== value) : [...type, value]
    );
  };

  async function handleSearch(searchQuery) {
    const params = new URLSearchParams(searchQuery);
    const response = await fetch(`/search?${params.toString()}`);
    const data = await response.json();
    console.log(data);
  }

  const handleSubmit = event => {
    event.preventDefault();

    handleSearch({
      query,
      diet,
      cuisine,
      intolerances,
      includeIngredients,
      type,
      maxReadyTime,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Query:
        <input
          type="text"
          name="query"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </label>
      <br />
      <label>
        Diet:
        <select
          name="diet"
          value={diet}
          onChange={event => setDiet(event.target.value)}
        >
          <option value="">--Select a diet--</option>
          {diets.map(diet => (
            <option key={diet} value={diet}>
              {diet}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Cuisine:
        <select
          name="cuisine"
          value={cuisine}
          onChange={event => setCuisine(event.target.value)}
        >
          <option value="">--Select a cuisine--</option>
          {cuisines.map(cuisine => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </label>
      <br />
      <fieldset>
        <legend>Intolerances:</legend>
        {intoleranceOptions.map(intolerance => (
          <label key={intolerance}>
            <input
              type="checkbox"
              name="intolerances"
              value={intolerance}
              checked={intolerances.includes(intolerance)}
              onChange={handleIntoleranceChange}
            />
            {intolerance}
          </label>
        ))}
      </fieldset>
      <br />
      <label>
        Include Ingredients:
        <input
          type="text"
          name="includeIngredients"
          onChange={handleIncludeIngredientsChange}
        />
      </label>
      <br />
      <fieldset>
        <legend>Type:</legend>
        {typeOptions.map(typeOption => (
          <label key={typeOption}>
            <input
              type="checkbox"
              name="type"
              value={typeOption}
              checked={type.includes(typeOption)}
              onChange={handleTypeChange}
            />
            {typeOption}
          </label>
        ))}
      </fieldset>
      <br />
      <label>
        Max Ready Time:
        <input
          type="number"
          name="maxReadyTime"
          value={maxReadyTime}
          onChange={event => setMaxReadyTime(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Search</button>
    </form>
  );
}