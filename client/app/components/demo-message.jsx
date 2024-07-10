import {Alert, Typography } from '@mui/material'

const DemoMessage = () => {
    return (
      <Alert severity="info">
        <Typography variant="body2" align="center">
          Please note that this is a demo version where APIs are disabled for cost reasons. This version uses mock API, please be aware that the mock might not be fully accurate.
        </Typography>
      </Alert>
    );
};

export default DemoMessage;