const { useState } = React;
const { Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox, Button } = MaterialUI;

function SearchForm({ onSearch }) {
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
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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
            <Grid item xs={4}>
              <FormControl component="fieldset">
                <legend>Intolerances:</legend>
                <FormGroup>
                  {intoleranceOptions.map((intolerance) => (
                    <FormControlLabel
                      key={intolerance}
                      control={
                        <Checkbox
                          name="intolerances"
                          value={intolerance}
                          checked={intolerances.includes(intolerance)}
                          onChange={handleIntoleranceChange}
                        />
                      }
                      label={intolerance}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid> 
        </Grid> 
      </Grid>
      
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                label="Query"
                name="query"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained">Search</Button> 
            </Grid> 
          </Grid> 
        </Grid>
      </Grid> 
    </form> 
  );
}