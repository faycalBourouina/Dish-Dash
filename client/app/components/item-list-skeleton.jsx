'use client'

import { Skeleton, styled, Card, CardMedia, CardContent, CardActions } from '@mui/material'

const StyledCard = styled(Card)({
    maxWidth: 220,
    margin: '16px',
    borderRadius: 0,
});
  
const StyledCardMedia = styled(CardMedia)({
    height: 220,
});   

const ItemListSkeleton = () => {
    return (
      <>
        {Array.from(new Array(10)).map((_, index) => (
              <StyledCard>
                <Skeleton variant="rectangular" height={220} />
                <CardContent>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="80%" />
                </CardContent>
                <CardActions>
                  <Skeleton variant="text" width="80px" height="30px" />
                </CardActions>
              </StyledCard>
        ))}
      </>
    );
}

export default ItemListSkeleton;