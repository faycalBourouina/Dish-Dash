const { Skeleton } = MaterialUI;


function RecipeListSkeleton() {
    return (
      <Grid container spacing={8}>
        {Array.from(new Array(20)).map((_, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ width: '100%', maxWidth: '100%', borderRadius: 0 }}>
              <Skeleton variant="rectangular" height={200} />
              <CardContent>
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
              </CardContent>
              <CardActions>
                <Skeleton variant="text" width="80px" height="30px" />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }