const { AppBar, Toolbar, CssBaseline, ButtonBase } = MaterialUI;

function Navbar({ isLogged, handleLogin, handleSignup, handleLogout, setActiveTab, setSelectedRecipe }) {
  
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedRecipe(null); // Clear the selected recipe
  };

  const handleSignupWithModal = (email, password) => {
    handleSignup(email, password);
    setIsModalOpen(true);
  };

    return (
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <Grid container justifyContent="space-between"  pl={5} pr={5}>
              <Grid item >
                <ButtonBase 
                  onClick={() => handleTabClick("home")}
                  color="inherit" 
                  underline="none"
                  sx={{ fontSize: '1.2rem', minHeight: '48px'}}
                >
                  Home
                </ButtonBase>
              </Grid>
              {isLogged ? (
                <>
                  <Grid item>
                    <Grid container spacing={4}>
                      <Grid item>
                        <ButtonBase
                          onClick={() => handleTabClick("favorites")}
                          color="inherit" 
                          underline="none"
                          sx={{ fontSize: '1.2rem', minHeight: '48px'}}
                        >
                          Favorites
                        </ButtonBase>
                      </Grid>
                      <Grid item>
                        <ButtonBase
                          onClick={handleLogout}
                          color="inherit" 
                          underline="none"
                          sx={{ fontSize: '1.2rem', minHeight: '48px'}}
                        >
                          Logout
                        </ButtonBase>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
                ) : (
                <Grid item xs={4}>
                    <Grid container justifyContent="flex-end" sx={{ marginLeft: '25px' }}>
                      <AuthForm 
                        handleLogin={handleLogin} 
                        handleSignup={handleSignupWithModal}
                      />
                    </Grid>
                </Grid>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
        <TagsModal
          isLogged={isLogged}
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)} 
        />
      </Box>
  );
}
