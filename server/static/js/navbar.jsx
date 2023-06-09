const { useState } = React;
const { AppBar, Toolbar, CssBaseline, ButtonBase } = MaterialUI;

function Navbar({ activeTab, setActiveTab, isLogged, setNewUser, newUser, handleLogin, handleSignup, message, setMessage, handleLogout, setSelectedRecipe }) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedRecipe(null); // Clear the selected recipe
  };

  const handleSignupWithModal = (email, password) => {
    handleSignup(email, password);
    setActiveTab("home");
  };

  const handleLoginWithModal = (email, password) => {
    handleLogin(email, password);
    if (message && message.isError) {
      return // don't close the modal if there was an error
    }
    else if (!message.isError) {
      // If successful, close the modal after a short delay
      setTimeout(() => { 
        setIsModalOpen(false);
        setActiveTab("home");
        setNewUser(false);
        setMessage({}); // clear the message
      }, 2000);
    }
  };

  const handleClose = () => {
      setActiveTab("home"); // reset the active tab
      setIsModalOpen(false) // close the modal
      setNewUser(false) // reset newUser
      setMessage({}); // clear the message
  }

    return (
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center" pl={5} pr={5}>
              <Grid item>
                <Grid container justifyContent="flex-start" spacing={2}>
                  <Grid item>
                    <Box pt={1}>
                      <img src="static/img/logo_fill.png" alt="Logo" style={{ height: '48px' }} />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box pt={1}>
                      <ButtonBase
                        onClick={() => handleTabClick("home")}
                        color="inherit"
                        underline="none"
                        sx={{ fontSize: '1.2rem', minHeight: '48px' }}
                      >
                        <i
                          className="material-icons"
                          style={{
                            marginRight: '8px',
                            color: activeTab === "home" ? '#FFCB05' : 'white',
                          }}
                        >
                          home
                        </i>
                        Home
                      </ButtonBase>
                    </Box>
                  </Grid>
                </Grid>
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
                          <i 
                            className="material-icons" 
                            style={{ 
                              marginRight: '8px',                       
                              color: activeTab === "favorites" ? '#FFCB05' : 'white',
                          }}
                          >
                              favorite
                          </i>
                          My Recipes
                        </ButtonBase>
                      </Grid>
                      <Grid item>
                        <ButtonBase
                          onClick={() => {handleLogout(); handleTabClick("home")}}
                          color="inherit" 
                          underline="none"
                          sx={{ fontSize: '1.2rem', minHeight: '48px'}}
                        >
                          <i 
                            className="material-icons" 
                              style={{ 
                              marginRight: '8px',                       
                              color: activeTab === "account" ? '#FFCB05' : 'white',
                            }}
                          >
                            logout
                          </i>
                          Logout
                        </ButtonBase>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
                ) : (
                <Grid item xs={4}>
                  <Grid container justifyContent="flex-end" sx={{ marginLeft: '0px' }}>
                    <ButtonBase
                      onClick={() => {setIsModalOpen(true); setActiveTab("account")}}
                      color="inherit"
                      underline="none"
                      sx={{ fontSize: '1.2rem', minHeight: '48px' }}
                    >
                        <i 
                            className="material-icons" 
                            style={{ 
                              marginRight: '8px',                       
                              color: activeTab === "account" ? '#FFCB05' : 'white',
                          }}
                        >
                          account_circle
                        </i>
                      Account
                    </ButtonBase>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      <Box/>

      {isModalOpen && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pr: 5 }}>
          <AuthModal
                  open={isModalOpen}
                  isLogged={isLogged}
                  handleClose={handleClose}
                  handleLogin={handleLoginWithModal}
                  handleSignup={handleSignupWithModal}
                  message={message}
                  newUser={newUser}
          />
        </Box>
      )}
      </Box>
  );
}
