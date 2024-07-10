'use client';

import { createContext, useState } from 'react'

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

export { FavoriteMessageContext, FavoriteMessageProvider }