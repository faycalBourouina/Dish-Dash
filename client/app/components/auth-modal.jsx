const { Dialog } = MaterialUI;
const { useContext } = React;

function AuthModal({ open, handleClose, handleLoginWithModal, handleSignupWithModal}) {
const { newUser } = useContext(AuthContext)
  return (
    <Dialog open={open} onClose={handleClose}>
        {!newUser ? (
            <AuthForm
                open={open}
                handleLoginWithModal = {handleLoginWithModal}
                handleSignupWithModal={handleSignupWithModal}
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

