const { Dialog } = MaterialUI;

function AuthModal({ newUser, isLogged, open, handleClose, handleLogin, handleSignup }) {
  console.log("New user: ", newUser);
  const transitionDirection = newUser ? 'left' : 'right';

  return (
    <Dialog open={open} onClose={handleClose}>
        {!newUser ? (
            <AuthForm
                open={open}
                handleClose={handleClose}
                handleLogin={handleLogin}
                handleSignup={handleSignup}
            />
        ) : (
            <TagsModal
                isLogged={isLogged}
                open={open}
                handleClose={handleClose}
            />
        )}
    </Dialog>
  );
}

