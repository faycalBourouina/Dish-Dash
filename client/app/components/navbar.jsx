'use client';

import { useState, useContext } from 'react'; 
import { Grid, Box, ButtonBase, AppBar, Toolbar, CssBaseline, IconButton } from '@mui/material'

import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


import { ActiveTabContext, AuthContext, SelectedRecipeContext } from '../contexts';
import { AuthModal  } from './';
import useAuth from '../hooks/useAuth';
import { actionTypes } from '../reducers';


const Navbar = () => {

  const { UPDATE_SELECTED } = actionTypes;
  const { handleLogout, handleLogin, handleSignup } = useAuth()

  const { activeTab, setActiveTab }  = useContext(ActiveTabContext)
  const { isLogged, authMessage, setAuthMessage, setNewUser  } = useContext(AuthContext)
  const { state: { selectedRecipe}, dispatch: selectedDispatch } = useContext(SelectedRecipeContext)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    selectedDispatch({ type: UPDATE_SELECTED, payload: { selected: null} }); // Clear the selected recipe
  };

  const handleSignupWithModal = (email, password) => {
    handleSignup(email, password);
    setActiveTab("home");
  };

  const handleLoginWithModal = (email, password) => {
    handleLogin(email, password);
    if (authMessage && authMessage.isError) {
      return // don't close the modal if there was an error
    }
    else if (!authMessage.isError) {
      // If successful, close the modal after a short delay
      setTimeout(() => { 
        setIsModalOpen(false);
        setActiveTab("home");
        setNewUser(false);
        setAuthMessage({}); // clear the message
      }, 2000);
    }
  };

  const handleClose = () => {
      setActiveTab("home"); // reset the active tab
      setIsModalOpen(false) // close the modal
      setNewUser(false) // reset newUser
      setAuthMessage({}); // clear the message
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
                      <img src="/static/img/logo_fill.png" alt="Logo" style={{ height: '48px' }} />
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
                        <HomeIcon
                          sx={{
                            marginRight: '8px',
                            color: activeTab === "home" ? '#FFCB05' : 'white',
                          }}
                        />
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
                          <FavoriteIcon
                            sx={{ 
                              marginRight: '8px',                       
                              color: activeTab === "favorites" ? '#FFCB05' : 'white',
                          }}
                          />
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
                          <ExitToAppIcon
                            className="material-icons" 
                              style={{ 
                              marginRight: '8px',                       
                              color: activeTab === "account" ? '#FFCB05' : 'white',
                            }}
                          />
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
                      <AccountCircleIcon
                        sx={{ 
                          marginRight: '8px',                       
                          color: activeTab === "account" ? '#FFCB05' : 'white',
                        }}
                      />                     
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
                  handleLoginWithModal={handleLoginWithModal}
                  handleSignupWithModal={handleSignupWithModal}
          />
        </Box>
      )}
      </Box>
  );
}

export default Navbar;