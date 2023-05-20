const { useState } = React;

function App({ userId }) {

  const [isLogged, setIsLogged] = useState(userId);
  
  const handleLogin = (email, password) => {
    console.log('Logging in with email:', email);
    console.log('Logging in with password:', password);
  };
  
  const handleLogout = async () => {
    try {
      const response = await fetch('/logout');
      const data = await response.json();
      console.log(data.message); // Print the logout message

      // Update the isLogged state
      setIsLogged(null);

    } catch (error) {
      console.error('Failed to logout:', error);
      // Handle any errors that occurred during logout
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
