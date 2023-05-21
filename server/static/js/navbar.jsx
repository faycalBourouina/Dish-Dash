function Navbar({ isLogged, handleLogin, handleSignup, handleLogout, setActiveTab, setSelectedRecipe }) {
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedRecipe(null); // Clear the selected recipe
  };

  return (
    <nav>
      <ul>
        <li>
          <a onClick={() => handleTabClick("home")}>
            Home
          </a>
        </li>
        {isLogged ? (
          <>
            <li>
              <a onClick={() => handleTabClick("favorites")}>
                Favorites
                </a>
            </li>
            <li>
              <button onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <AuthForm handleLogin={handleLogin} handleSignup={handleSignup}/>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}