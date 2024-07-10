import { Dialog, DialogTitle, DialogContent, TextField, Button, Grid, Alert } from '@mui/material'
import { useContext, useState } from 'react';

const AuthForm = ({ handleLoginWithModal, handleSignupWithModal, handleClose }) => {
  const { isLogged, authMessage } = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateEmail = (email) => {
    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    return emailPattern.test(email);
  };


  const handleLoginSubmit = () => {
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    if (password.length < 8) {
      setPasswordError(true);
      return;
    }
    handleLoginWithModal(email, password);
    setEmail('');
    setPassword('');
  };

  const handleSignupSubmit = () => {
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    if (password.length < 8) {
      setPasswordError(true);
      return;
    }
    handleSignupWithModal(email, password);
    setEmail('');
    setPassword('');
  };
  return (
    <Dialog open={true} onClose={handleClose}>
    <DialogTitle style={{ textAlign: 'center' }}>
      Let's get you cooking!
      <Box mt={2}>
        <img src="/static/img/logo.png" alt="food" style={{ margin: '0 auto', width: '120px', height: '120px' }} />
      </Box>
    </DialogTitle>
      <DialogContent>
        {authMessage.message && authMessage.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {authMessage.message}
          </Alert>
        )}
        {authMessage.message && !authMessage.isError && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {authMessage.message}
          </Alert>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailError ? 'Invalid email address' : ''}
              disabeled={isLogged}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordError ? 'Password must be at least 8 characters' : ''}
              disabeled={isLogged}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Button 
                  onClick={handleSignupSubmit} 
                  variant="text" 
                  color="primary"
                  disabeled={isLogged}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item>
                <Button 
                  onClick={handleLoginSubmit} 
                  variant="contained" 
                  color="primary"
                  disabeled={isLogged}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default AuthForm;