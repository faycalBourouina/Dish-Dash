const { Dialog, DialogTitle, DialogContent, DialogActions } = MaterialUI;

function AuthModal({ newUser, isLogged, open, handleClose, handleLogin, handleSignup }) {

    return (
        <>
            {!newUser ? (
                <AuthForm
                    open={open}
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
        </>
    )
}