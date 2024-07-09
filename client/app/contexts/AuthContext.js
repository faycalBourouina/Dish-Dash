import { createContext, useState } from 'react';

const AuthContext = createContext();

function AuthProvider ({ children, initialIsLogged }) {
    const [isLogged, setIsLogged] = useState(initialIsLogged)
    const [newUser, setNewUser] = useState(false);
    const [authMessage, setAuthMessage] = useState({});

    return (
     <AuthContext.Provider value={{ isLogged, setIsLogged, newUser, setNewUser, authMessage, setAuthMessage }}>
        {children}
     </AuthContext.Provider>
    )
};
