const { Dialog, DialogTitle, DialogContent, DialogActions ,Chip } = MaterialUI;

const diets = ['gluten free', 'ketogenic', 'vegetarian', 'lacto-vegetarian', 'ovo-vegetarian', 'vegan', 'pescetarian', 'paleo', 'primal', 'low-fodmap', 'whole30'];
const mealTypes = ['main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink'];
const cuisines = ['african', 'asian', 'american', 'british', 'cajun', 'caribbean', 'chinese', 'eastern european', 'european', 'french', 'german', 'greek', 'indian', 'irish', 'italian', 'japanese', 'jewish', 'korean', 'latin american', 'mediterranean', 'mexican', 'middle eastern', 'nordic', 'southern', 'spanish', 'thai', 'vietnamese'];
const intolerance = ['egg', 'gluten', 'grain', 'peanut', 'seafood', 'sesame', 'shellfish', 'soy', 'sulfite', 'tree nut', 'wheat', 'dairy', 'fat', 'fodmap', 'pork', 'red meat', 'sugar'];

const TagsModal = ({ isLogged, handleClose }) => {
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

    handleClose();
    setSelectedTags([]);
  };
  return (
    <>
      <DialogTitle>
        <Box textAlign="center">
          <Typography variant="h5">Tell us more, Chef!</Typography>
        </Box>
      </DialogTitle>
      <DialogContent
        id="scrollList"
        className="ScrollList"
        maxWidth
        fullWidth
        PaperProps={{
          style: {
            width: "400px",
            height: "800px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box width="100%" textAlign="center" marginBottom={2}>
            <Typography variant="subtitle1">Diets</Typography>
          </Box>
          <Box width="100%" display="flex" justifyContent="center" flexWrap="wrap" marginBottom={2}>
            {diets.map((diet) => (
              <Box key={diet} margin={1}>
                <Chip
                  label={diet}
                  onClick={() => handleChipClick(diet)}
                  color={selectedTags.includes(diet) ? 'primary' : 'default'}
                  size="large"
                />
              </Box>
            ))}
          </Box>
  
          <Box width="100%" textAlign="center" marginBottom={2}>
            <Typography variant="subtitle1">Cuisines</Typography>
          </Box>
          <Box width="100%" display="flex" justifyContent="center" flexWrap="wrap" marginBottom={2}>
            {cuisines.map((cuisine) => (
              <Box key={cuisine} margin={1}>
                <Chip
                  label={cuisine}
                  onClick={() => handleChipClick(cuisine)}
                  color={selectedTags.includes(cuisine) ? 'primary' : 'default'}
                  size="medium"
                />
              </Box>
            ))}
          </Box>
  
          <Box width="100%" textAlign="center" marginBottom={2}>
            <Typography variant="subtitle1">Meal Types</Typography>
          </Box>
          <Box width="100%" display="flex" justifyContent="center" flexWrap="wrap" marginBottom={2}>
            {mealTypes.map((mealType) => (
              <Box key={mealType} margin={1}>
                <Chip
                  label={mealType}
                  onClick={() => handleChipClick(mealType)}
                  color={selectedTags.includes(mealType) ? 'primary' : 'default'}
                  size="medium"
                />
              </Box>
            ))}
          </Box>
  
          <Box width="100%" textAlign="center" marginBottom={2}>
            <Typography variant="subtitle1">Intolerances</Typography>
          </Box>
          <Box width="100%" display="flex" justifyContent="center" flexWrap="wrap" marginBottom={2}>
            {intolerance.map((intolerant) => (
              <Box key={intolerant} margin={1}>
                <Chip
                  label={intolerant}
                  onClick={() => handleChipClick(intolerant)}
                  color={selectedTags.includes(intolerant) ? 'primary' : 'default'}
                  size="medium"
                />
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleDoneClick} variant="text">
          Done
        </Button>
        <Button onClick={handleClose} variant="text">
          Skip
        </Button>
      </DialogActions>
    </>
  );
}