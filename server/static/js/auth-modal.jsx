const { Dialog } = MaterialUI;

function AuthModal({ newUser, isLogged, open, handleClose, handleLogin, handleSignup, message }) {

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
                isLogged={isLogged}
                message={message}
                handleClose={handleClose}   
            />
        )}
    </Dialog>
  );
}

