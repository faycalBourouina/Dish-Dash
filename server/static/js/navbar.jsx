function Navbar({ isLogged, setActiveTab, setSelectedRecipe }) {
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedRecipe(null); // Clear the selected recipe
  };

  const handleLogin = (email, password) => {
    console.log('Logging in with email:', email);
    console.log('Logging in with password:', password);
  };

  return (
    <nav>
      <ul>
        <li>
          <a onClick={() => handleTabClick("home")}>
            Home
          </a>
        </li>
        {!isLogged ? (
          <>
            <li>
              <a onClick={() => handleTabClick("favorites")}>
                Favorites
                </a>
            </li>
            <li>
              <button>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <LoginForm handleLogin={handleLogin} />
            </li>
            <li>
              <button>Sign Up</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}