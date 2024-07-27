'use client';

import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false)
    const [newUser, setNewUser] = useState(false);
    const [authMessage, setAuthMessage] = useState({});


    const fetchUser = async () => {
        try {  
            const response = await fetch(`api/session`, {
              method: 'GET',
              credentials: 'include',
            });
            if (response.ok) {
              const data = await response.json();
              const { user } = data;
              setIsLogged(user)
            } 
            else {
                console.log("Session not found")
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
     <AuthContext.Provider value={{ isLogged, setIsLogged, newUser, setNewUser, authMessage, setAuthMessage }}>
        {children}
     </AuthContext.Provider>
    )
};
export { AuthContext, AuthProvider }
