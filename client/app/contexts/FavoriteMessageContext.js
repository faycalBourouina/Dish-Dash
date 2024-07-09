import { createContext, useState } from React

const FavoriteMessageContext = createContext();

const FavoriteMessageProvider = ({ children }) => {
  const [favoriteMessage, setFavoriteMessage] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <FavoriteMessageContext.Provider value={{ favoriteMessage, setFavoriteMessage, alertOpen, setAlertOpen }}>
      {children}
    </FavoriteMessageContext.Provider>
  );
}

export default FavoriteMessageProvider;