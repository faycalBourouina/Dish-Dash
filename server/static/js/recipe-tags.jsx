function RecipeTags({ recipe }) {
    const { readyInMinutes, servings, vegan, vegetarian, glutenFree, dairyFree, healthScore } = recipe;
  
    return (
        <Box display="flex" flexWrap="wrap">
          {readyInMinutes && (
            <Box marginRight={1} marginBottom={1}>
              <Chip label={`${readyInMinutes} minutes`} />
            </Box>
          )}
          {servings && (
            <Box marginRight={1} marginBottom={1}>
              <Chip label={`Servings: ${servings}`} />
            </Box>
          )}
          {vegan && (
            <Box marginRight={1} marginBottom={1}>
              <Chip label="Vegan" />
            </Box>
          )}
          {vegetarian && (
            <Box marginRight={1} marginBottom={1}>
              <Chip label="Vegetarian" />
            </Box>
          )}
          {glutenFree && (
            <Box marginRight={1} marginBottom={1}>
              <Chip label="Gluten Free" />
            </Box>
          )}
          {dairyFree && (
            <Box marginRight={1} marginBottom={1}>
              <Chip label="Dairy Free" />
            </Box>
          )}
          {healthScore && (
            <Box marginRight={1} marginBottom={1}>
              <Chip label={`Health Score: ${healthScore}`} />
            </Box>
          )}
        </Box>
    );    
  }