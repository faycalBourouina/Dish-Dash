import { Dialog } from '@mui/material' 
import { useContext } from 'react';
import { AuthContext } from '../contexts';

import { AuthForm, TagsModal } from './'

const AuthModal = ({ open, handleClose, handleLoginWithModal, handleSignupWithModal}) => {
    const { newUser } = useContext(AuthContext)

    return (
        <Dialog open={open} onClose={handleClose}>
            {!newUser ? (
                <AuthForm
                    handleLoginWithModal = {handleLoginWithModal}
                    handleSignupWithModal={handleSignupWithModal}
                    handleClose={handleClose}
                />
            ) : (
                <TagsModal
                    handleClose={handleClose}
                />
            )}
        </Dialog>
    );
}

export default AuthModal;

