const { Dialog, DialogTitle, DialogContent, DialogActions ,Chip } = MaterialUI;

const diets = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'low-FODMAP', 'Whole30'];
const mealTypes = ['Main Course', 'Side Dish', 'Dessert', 'Appetizer', 'Salad', 'Bread', 'Breakfast', 'Soup', 'Beverage', 'Sauce', 'Marinade', 'Fingerfood', 'Snack', 'Drink'];
const cuisines = ['African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American','Mediterranean','Mexican','Middle Eastern','Nordic','Southern','Spanish','Thai','Vietnamese'];
const intolerance = ['Egg','Gluten','Grain','Peanut','Seafood','Sesame','Shellfish','Soy','Sulfite','Tree Nut','Wheat','Dairy','Fat','FODMAP','Pork','Red Meat','Sugar'];

const TagsModal = ({ isLogged, open, handleClose }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  // Select or deselect a tag and update the selectedTags state
  const handleChipClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Send the selected tags to the server and close the modal


  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Diet and Cuisine Tags</DialogTitle>
      <DialogContent>
        <h3>Diets</h3>
        {diets.map((diet) => (
          <Chip
            label={diet}
            onClick={() => handleChipClick(diet)}
            color={selectedTags.includes(diet) ? "primary" : "default"}
          />
        ))}
        <h3>Cuisines</h3>
        {cuisines.map((cuisine) => (
          <Chip
            label={cuisine}
            onClick={() => handleChipClick(cuisine)}
            color={selectedTags.includes(cuisine) ? "primary" : "default"}
          />
        ))}
        <h3>Meal Types</h3>
        {mealTypes.map((mealType) => (
          <Chip
            label={mealType}
            onClick={() => handleChipClick(mealType)}
            color={selectedTags.includes(mealType) ? "primary" : "default"}
          />
        ))}
        <h3>Intolerances</h3>
        {intolerance.map((intolerant) => (
          <Chip
            label={intolerant}
            onClick={() => handleChipClick(intolerant)}
            color={selectedTags.includes(intolerant) ? "primary" : "default"}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDoneClick} variant="text">
          Done
        </Button>
        <Button onClick={handleClose} variant="text">
          Skip
        </Button>
      </DialogActions>
    </Dialog>
  );
};