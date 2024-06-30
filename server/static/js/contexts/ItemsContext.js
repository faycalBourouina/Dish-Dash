const { createContext, useState } = React;

const ItemsContext = createContext()

function ItemsProvider({ children }) {
    const [cachedItems, setCachedItems] = useState({});

    return(
        <ItemsContext.Provider value={{ cachedItems, setCachedItems }}>
            {children}
        </ItemsContext.Provider>
    );
};