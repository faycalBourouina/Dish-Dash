const { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, Alert } = MaterialUI;

function AuthForm({ handleLogin, handleSignup, handleClose, message }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  console.log("Message: ", message);

  const handleLoginSubmit = () => {
    /*if (!email.includes('@')) {
      setEmailError(true);
      return;
    }
    if (password.length < 8) {
      setPasswordError(true);
      return;
    }*/
    handleLogin(email, password);
    setEmail('');
    setPassword('');
  };

  const handleSignupSubmit = () => {
   /* if (!email.includes('@')) {
      setEmailError(true);
      return;
    }
    if (password.length < 8) {
      setPasswordError(true);
      return;
    }*/
    handleSignup(email, password);
    setEmail('');
    setPassword('');
  };
  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle style={{ textAlign: 'center' }}>Authentication</DialogTitle>
      <DialogContent>
        {message.message && message.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {message.message}
          </Alert>
        )}
        {message.message && !message.isError && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message.message}
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
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Button onClick={handleSignupSubmit} variant="text" color="primary">
                  Sign Up
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={handleLoginSubmit} variant="contained" color="primary">
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