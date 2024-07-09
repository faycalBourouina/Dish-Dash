import { createContext, useState } from 'react';

const ItemsContext = createContext()

const ItemsProvider = ({ children }) => {
    const [cachedItems, setCachedItems] = useState({});

    return(
        <ItemsContext.Provider value={{ cachedItems, setCachedItems }}>
            {children}
        </ItemsContext.Provider>
    );
};

export default ItemsProvider;