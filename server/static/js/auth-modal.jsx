const { Dialog } = MaterialUI;
const { useContext } = React;

function AuthModal({ open, handleClose, handleLogin, handleSignup}) {
const { newUser } = useContext(AuthContext)
  return (
    <Dialog open={open} onClose={handleClose}>
        {!newUser ? (
            <AuthForm
                open={open}
                handleLogin={handleLogin}
                handleSignup={handleSignup}
                handleClose={handleClose}
            />
        ) : (
            <TagsModal
                open={open}
                handleClose={handleClose}
            />
        )}
    </Dialog>
  );
}

