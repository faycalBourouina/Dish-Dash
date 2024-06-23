const { createContext, useState } = React;

const AuthContext = createContext();

function AuthProvider ({ children, initialIsLogged }) {
    const [isLogged, setIsLogged] = useState(initialIsLogged)
    const [newUser, setNewUser] = useState(false);


    return (
     <AuthContext.Provider value={{ isLogged, setIsLogged, newUser, setNewUser }}>
        {children}
     </AuthContext.Provider>
    )
};
