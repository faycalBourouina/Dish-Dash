const { useState } = React;
const { Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox, Button, Stack, styled } = MaterialUI;

function SearchForm({ onSearch }) {

  const [autoComplete, setAutoComplete] = useState([]);
  const [query, setQuery] = useState('');
  const [diet, setDiet] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [intolerances, setIntolerances] = useState([]);
  const [includeIngredients, setIncludeIngredients] = useState([]);
  const [type, setType] = useState([]);
  const [maxReadyTime, setMaxReadyTime] = useState('');

  const diets = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'low-FODMAP', 'Whole30']; 
  const cuisines = ['African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'];
  const intoleranceOptions = ['Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat', 'Dairy', 'Fat', 'FODMAP', 'Pork', 'Red Meat', 'Sugar'];
  const typeOptions = ['Main Course', 'Side Dish', 'Dessert', 'Appetizer', 'Salad', 'Bread', 'Breakfast', 'Soup', 'Beverage', 'Sauce', 'Marinade', 'Fingerfood', 'Snack', 'Drink'];

  const handleQueryChange = event => {
    setQuery(event.target.value);
  };

  const handleDietChange = event => {
    setDiet(event.target.value);
  };

  const handleCuisineChange = event => {
    setCuisine(event.target.value);
  };

  const handleIntoleranceChange = event => {
    const { value } = event.target;
    setIntolerances(intolerances =>
      intolerances.includes(value)
        ? intolerances.filter(i => i !== value)
        : [...intolerances, value]
    );
  };

  const handleIngredientsChange = event => {
    setIncludeIngredients(event.target.value.split(','));
  };

  const handleTypeChange = event => {
    const { value } = event.target;
    setType(type =>
      type.includes(value) ? type.filter(t => t !== value) : [...type, value]
    );
  };

  const handleReadyTimeChange = event => {
    setMaxReadyTime(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSearch({
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
      <Grid container justifyContent="center">
        <Grid item xs={12} pb={2}>
          <Stack direction="row" spacing={2}>
            <Grid item xs={3}>
              <TextField 
                label="Search for a recipe"
                name="query"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
            <TextField
              label="Include Ingredients"
              name="includeIngredients"
              value={includeIngredients.join(',')}
              onChange={handleIngredientsChange}
              fullWidth
            />
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel>Intolerances</InputLabel>
                <Select
                  multiple
                  name="intolerances"
                  value={intolerances}
                  onChange={(event) => setIntolerances(event.target.value)}
                >
                  {intoleranceOptions.map((intolerance) => (
                    <MenuItem key={intolerance} value={intolerance}>
                      {intolerance}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <FormControl fullWidth>
                <InputLabel>Diet</InputLabel>
                <Select
                  name="diet"
                  value={diet}
                  onChange={(event) => setDiet(event.target.value)}
                >
                  <MenuItem value="">
                    <em>--Select a diet--</em>
                  </MenuItem>
                  {diets.map((diet) => (
                    <MenuItem key={diet} value={diet}>
                      {diet}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <FormControl fullWidth>
                <InputLabel>Cuisine</InputLabel>
                <Select
                  name="cuisine"
                  value={cuisine}
                  onChange={(event) => setCuisine(event.target.value)}
                >
                  <MenuItem value="">
                    <em>--Select a cuisine--</em>
                  </MenuItem>
                  {cuisines.map((cuisine) => (
                    <MenuItem key={cuisine} value={cuisine}>
                      {cuisine}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  multiple
                  name="type"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                >
                  {typeOptions.map((typeOption) => (
                    <MenuItem key={typeOption} value={typeOption}>
                      {typeOption}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <TextField
                label="Max Ready Time (mins)"
                name="maxReadyTime"
                value={maxReadyTime}
                onChange={(event) => setMaxReadyTime(event.target.value)}
                fullWidth
              />
            </Grid>
          </Stack>
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-end">
        <Grid item xs={1} pl={1}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Search
          </Button>
        </Grid>
      </Grid>
    </form> 
  );
}