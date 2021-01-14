import { createContext, useState, useContext } from 'react';
import {initialDecks, initialInventory, initialCards} from '../mockdata/CardData'
export const AppContext = createContext();
export const useApp = () => useContext(AppContext);

export function AppContextProvider({children}) {

  const [applicationState, setApplicationState] = useState({initialDecks, initialInventory});

  return (
    <AppContext.Provider value={ {...applicationState, cards: initialCards, buyCard: buyCardForPlayer }}>
      { children }
      </AppContext.Provider>
  )
}
//this is a comment
