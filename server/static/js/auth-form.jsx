const { useState } = React;

function AuthForm({ handleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLoginForm = () => {

      handleLogin(email, password);
      setEmail('');
      setPassword('');
    };
  
    return (
      <>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLoginForm}>Login</button>
      </>
    );
  }