const { useState } = React;

function AuthForm({ handleLogin, handleSignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLoginSubmit = () => {

      handleLogin(email, password);
      setEmail('');
      setPassword('');
    };

    const handleSignupSubmit = () => {
      handleSignup(email, password);
      setEmail('');
      setPassword('');
    };
  
  
    return (
      <>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLoginSubmit}>Login</button>
        <button onClick={handleSignupSubmit}>Sign Up</button>
      </>
    );
  }