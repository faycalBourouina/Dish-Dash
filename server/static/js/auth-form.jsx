const { useState } = React;

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
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item>
          <ButtonBase
            onClick={handleLoginSubmit}
            color="inherit" 
            underline="none"
            sx={{ fontSize: '1.0rem', minHeight: '48px'}} 

          >
            Login
          </ButtonBase>
        </Grid>
        <Grid item>
          <ButtonBase 
            onClick={handleSignupSubmit}
            color="inherit" 
            underline="none"
            sx={{ fontSize: '1.0rem', minHeight: '48px'}}
            fullWidth
          >
            Sign Up
          </ButtonBase>
        </Grid>
      
      </Grid>
    );
  }