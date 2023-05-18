function Navbar({ isLogged, setActiveTab }) {
  return (
    <nav>
      <ul>
        <li>
          <a onClick={() => setActiveTab("home")}>Home</a>
        </li>
        {isLogged ? (
          <>
            <li>
              <a onClick={() => setActiveTab("favorites")}>Favorites</a>
            </li>
            <li>
              <button>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button>Login</button>
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