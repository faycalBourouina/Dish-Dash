const { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, ButtonBase } = MaterialUI;

function AuthForm({ handleLogin, handleSignup, handleClose }) {
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
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle style={{ textAlign: 'center' }}>Authentication</DialogTitle>
      <DialogContent
        maxWidth="false"
        fullWidth
        PaperProps={{
          style: {
            width: "400px",
            height: "600px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="center">
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