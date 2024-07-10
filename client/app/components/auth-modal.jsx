import { Dialog } from '@mui/material' 
import { useContext } from 'react';

import { AuthForm, TagsModal } from './'

const AuthModal = ({ open, handleClose, handleLoginWithModal, handleSignupWithModal}) => {
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

