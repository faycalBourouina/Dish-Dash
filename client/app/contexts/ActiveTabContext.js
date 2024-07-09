import { createContext, useState } from 'react';

const ActiveTabContext = createContext();

function ActiveTabProvider ({ children }) {

    const [activeTab, setActiveTab] = useState('home');

    return (
     <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
        {children}
     </ActiveTabContext.Provider>
    )
};
