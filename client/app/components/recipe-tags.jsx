import { Box, Chip } from '@mui/material';

function FontAwesomeIcon({ iconClass }) {
  return (
    <i
      className={`fas ${iconClass}`}
      style={{ 
              fontSize: '1.5rem', 
               marginLeft: '0.5rem'
            }}
    />
  );
}

const RecipeTags = ({ recipe }) => {
    const { readyInMinutes, servings, vegan, vegetarian, glutenFree, dairyFree, healthScore } = recipe;
  
    return (
      <Box display="flex" flexWrap="wrap">
        <Box marginRight={1} marginBottom={1}>
          <Chip
            icon={<FontAwesomeIcon iconClass="fa-clock" />}
            label={`${readyInMinutes} minutes`}
          />
        </Box>
        <Box marginRight={1} marginBottom={1}>
          <Chip
            icon={<FontAwesomeIcon iconClass="fa-utensils" />}
            label={`Servings: ${servings}`}
          />
        </Box>
        {vegan && (
          <Box marginRight={1} marginBottom={1}>
            <Chip
              icon={<FontAwesomeIcon iconClass="fa-seedling" />}
              label="Vegan"
            />
          </Box>
        )}
        {vegetarian && (
          <Box marginRight={1} marginBottom={1}>
            <Chip
              icon={<FontAwesomeIcon iconClass="fa-carrot" />}
              label="Vegetarian"
            />
          </Box>
        )}
        {glutenFree && (
          <Box marginRight={1} marginBottom={1}>
            <Chip
              icon={<FontAwesomeIcon iconClass="fa-bread-slice" />}
              label="Gluten Free"
            />
          </Box>
        )}
        {dairyFree && (
          <Box marginRight={1} marginBottom={1}>
            <Chip
              icon={<FontAwesomeIcon iconClass="fa-cheese" />}
              label="Dairy Free"
            />
          </Box>
        )}
        {healthScore && (
          <Box marginRight={1} marginBottom={1}>
            <Chip
              icon={<FontAwesomeIcon iconClass="fa-heartbeat" />}
              label={`Health Score: ${healthScore}`}
            />
          </Box>
        )}
      </Box>
    );
  }

  export default RecipeTags;