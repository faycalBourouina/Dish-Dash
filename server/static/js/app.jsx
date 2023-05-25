const { useState } = React;

function App({ userId }) {

  //Storing the logged in user id
  const [isLogged, setIsLogged] = useState(userId);

  // Caching variable to store fetched items
  const [cachedItems, setCachedItems] = useState({});

  const handleLogin = async (email, password) => {
    console.log("Logging in with", email, password)
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
      const { user: { id } } = data;
      console.log('Logged in as', id);
      setIsLogged(id);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSignup = async (email, password) => {
    console.log("signing up with", email, password)
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          email,
          password
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        const { user: { id } } = data;
        console.log('Signed up as', id);
        setIsLogged(id);

      } else if (response.status === 409) {
        const data = await response.json();
        console.log('Signup failed:', data.message);
      } else {
        console.log('Signup failed with error:', response.status);
      }
    } catch (error) {
      console.error('Failed to signup:', error);
    }
  }
  
  const handleLogout = async () => {
    try {
      const response = await fetch('/logout');
      const data = await response.json();
      console.log(data.message); // Print the logout message

      // Update the isLogged state
      setIsLogged(null);

    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div>
      <div className="container">
      <Layout 
        isLogged={isLogged} 
        handleLogin={handleLogin} 
        handleSignup={handleSignup} 
        handleLogout={handleLogout}
        cachedItems={cachedItems}
        setCachedItems={setCachedItems}  
      />
      </div>
    </div>
  );
}
