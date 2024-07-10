'use client';

import { Snackbar, Alert } from '@mui/material'
import { useContext } from 'react'
import { FavoriteMessageContext } from '../contexts';

const FavoriteMessageBar = () => {

    const { favoriteMessage, setAlertOpen, alertOpen } = useContext(FavoriteMessageContext)
    
    return (
            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={() => setAlertOpen(false)}
            >
                <Alert
                onClose={() => setAlertOpen(false)}
                severity={favoriteMessage.includes("Failed") ? "error" : "success"}
                >
                {favoriteMessage}
                </Alert>
            </Snackbar>
    )
}

export default FavoriteMessageBar;