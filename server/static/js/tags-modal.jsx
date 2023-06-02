const { Dialog, DialogTitle, DialogContent, DialogActions ,Chip } = MaterialUI;

const diets = ['gluten free', 'ketogenic', 'vegetarian', 'lacto-vegetarian', 'ovo-vegetarian', 'vegan', 'pescetarian', 'paleo', 'primal', 'low-fodmap', 'whole30'];
const mealTypes = ['main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink'];
const cuisines = ['african', 'asian', 'american', 'british', 'cajun', 'caribbean', 'chinese', 'eastern european', 'european', 'french', 'german', 'greek', 'indian', 'irish', 'italian', 'japanese', 'jewish', 'korean', 'latin american', 'mediterranean', 'mexican', 'middle eastern', 'nordic', 'southern', 'spanish', 'thai', 'vietnamese'];
const intolerance = ['egg', 'gluten', 'grain', 'peanut', 'seafood', 'sesame', 'shellfish', 'soy', 'sulfite', 'tree nut', 'wheat', 'dairy', 'fat', 'fodmap', 'pork', 'red meat', 'sugar'];

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
  const handleDoneClick = async () => {
    const user_id = isLogged;
    console.log("user_id: ", user_id);
    console.log("selectedTags: ", selectedTags);

    const data = {
      tags: selectedTags,
    };

    try {
      const response = await fetch(`/users/${user_id}/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        const {tags} = data;
        console.log("Tags updated: ", tags);
      } else {
        console.error('Request failed:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setSelectedTags([]);
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Diet and Cuisine Tags</DialogTitle>
      <DialogContent>
        <h3>Diets</h3>
        {diets.map((diet) => (
          <div key={diet} style={{ display: 'inline-block', margin: '8px' }}>
            <Chip
              label={diet}
              onClick={() => handleChipClick(diet)}
              color={selectedTags.includes(diet) ? 'primary' : 'default'}
            />
          </div>
        ))}
        <h3>Cuisines</h3>
        {cuisines.map((cuisine) => (
          <div key={cuisine} style={{ display: 'inline-block', margin: '8px' }}>
            <Chip
              label={cuisine}
              onClick={() => handleChipClick(cuisine)}
              color={selectedTags.includes(cuisine) ? 'primary' : 'default'}
            />
          </div>
        ))}
        <h3>Meal Types</h3>
        {mealTypes.map((mealType) => (
          <div key={mealType} style={{ display: 'inline-block', margin: '8px' }}>
            <Chip
              label={mealType}
              onClick={() => handleChipClick(mealType)}
              color={selectedTags.includes(mealType) ? 'primary' : 'default'}
            />
          </div>
        ))}
        <h3>Intolerances</h3>
        {intolerance.map((intolerant) => (
          <div key={intolerant} style={{ display: 'inline-block', margin: '8px' }}>
            <Chip
              label={intolerant}
              onClick={() => handleChipClick(intolerant)}
              color={
                selectedTags.includes(intolerant) ? 'primary' : 'default'
              }
            />
          </div>
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
}