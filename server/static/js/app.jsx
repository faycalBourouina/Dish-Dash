const { useState } = React;

function App({ userId }) {

  const [isLogged, setIsLogged] = useState(userId);

  const handleLogin = async (email, password) => {
    console.log('Logging in with', email, password)
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
      <Layout isLogged={isLogged} handleLogin={handleLogin} handleLogout={handleLogout} />
      </div>
    </div>
  );
}
