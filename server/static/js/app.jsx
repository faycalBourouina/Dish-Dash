const { useState } = React;

function App({ isLogged }) {

  const handleLogin = (email, password) => {
    console.log('Logging in with email:', email);
    console.log('Logging in with password:', password);
  };

  const handleLogout = () => {
    console.log('Logging out');
  };


  return (
    <div>
      <div className="container">
      <Layout isLogged={isLogged} handleLogin={handleLogin} handleLogout={handleLogout} />
      </div>
    </div>
  );
}
