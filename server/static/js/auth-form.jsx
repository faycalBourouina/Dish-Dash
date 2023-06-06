const { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } = MaterialUI;

function AuthForm({ handleLogin, handleSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = () => {
    handleLogin(email, password);
    setEmail('');
    setPassword('');
  };

  const handleSignupSubmit = () => {
    handleSignup(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <Dialog open={true} onClose={() => {}}>
      <DialogTitle>Authentication</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLoginSubmit} variant="contained" color="primary">
          Login
        </Button>
        <Button onClick={handleSignupSubmit} variant="contained" color="primary">
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
}