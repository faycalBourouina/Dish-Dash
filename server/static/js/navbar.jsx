function Navbar({ isLogged, handleLogin, handleSignup, handleLogout, setActiveTab, setSelectedRecipe }) {
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedRecipe(null); // Clear the selected recipe
  };
  return (
    <nav>
      <Grid container>
        <Grid item xs={4}>
          <a onClick={() => handleTabClick("home")}>Home</a>
        </Grid>
        {isLogged ? (
          <>
            <Grid item xs={4}>
              <a onClick={() => handleTabClick("favorites")}>Favorites</a>
            </Grid>
            <Grid item xs={4}>
              <button onClick={handleLogout}>Logout</button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={8}>
              <AuthForm handleLogin={handleLogin} handleSignup={handleSignup} />
            </Grid>
          </>
        )}
      </Grid>
    </nav>
  );
}