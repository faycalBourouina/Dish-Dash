const { Dialog } = MaterialUI;
const { useContext } = React;

function AuthModal({ open, handleClose, handleLogin, handleSignup, message }) {
const { newUser } = useContext(AuthContext)
console.log ("new user status babyyyy!!!!!!!!!!:", newUser)
  return (
    <Dialog open={open} onClose={handleClose}>
        {!newUser ? (
            <AuthForm
                open={open}
                handleLogin={handleLogin}
                handleSignup={handleSignup}
                message={message}
                handleClose={handleClose}
            />
        ) : (
            <TagsModal
                open={open}
                message={message}
                handleClose={handleClose}   
            />
        )}
    </Dialog>
  );
}

