const { useState, useContext } = React;
const { Grid } = MaterialUI;

function App({ userId }) {

  const { setIsLogged } = useContext(AuthContext)
  const { setNewUser } = useContext(AuthContext)
  const [cachedSearch, setCachedSearch] = useState([]);
  const [cachedItems, setCachedItems] = useState({});
  const [authMessage, setAuthMessage] = useState({});

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          email,
          password
        })
      });
      const data = await response.json();

      if (response.ok) {
        const { user: { id } } = data;
        console.log('Logged in as', id);
        setIsLogged(id);
        setAuthMessage({ message: 'Login successful', isError: false });
      } else {
        const { message } = data;
        console.log('Login failed:', message);
        setAuthMessage({ message, isError: true });
      }
    } catch (error) {
      console.error('Failed to login:', error);
      setAuthMessage({ message: 'Login failed', isError: true });
    }
  };

  const handleSignup = async (email, password) => {
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          email,
          password,
        })
      });

      if (response.ok) {
        const data = await response.json();
        const { user: { id } } = data;
        console.log('Signed up as', id);
        setIsLogged(id);
        setAuthMessage({ message: 'Signup successful', isError: false });
        // delay setting newUser to true to allow for the message to be displayed
        setTimeout(() => setNewUser(true), 2000);

      } else if (response.status === 409) {
        const data = await response.json();
        const { message } = data;
        console.log('Signup failed:', message);
        setAuthMessage({ message, isError: true });
      } else {
        console.log('Signup failed with error:', response.status);
      }
    } catch (error) {
      console.error('Failed to signup:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout');
      const data = await response.json();
      console.log(data.message);
      setIsLogged(null);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
      <>
      <CachedLandingProvider>
        <CachedFavoritesProvider>
          <Layout 
              handleLogin={handleLogin} 
              handleSignup={handleSignup} 
              handleLogout={handleLogout}
              message={authMessage}
              setMessage = {setAuthMessage}
              cachedItems={cachedItems}
              setCachedItems={setCachedItems}
              cachedSearch={cachedSearch}
              setCachedSearch={setCachedSearch}
            />
        </CachedFavoritesProvider>
      </CachedLandingProvider>
    </>
  );
}