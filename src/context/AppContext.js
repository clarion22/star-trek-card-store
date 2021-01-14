import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import {initialDecks, initialInventory, initialCards} from '../mockdata/CardData'
export const AppContext = createContext();
export const useApp = () => useContext(AppContext);


export function AppContextProvider({children}) {

  const [applicationState, setApplicationState] = useState({initialDecks, initialInventory});
  const buyCardForPlayer = useCallback((cardId) => {
    const inventory = applicationState.initialInventory;
    if (inventory[cardId] > 0) inventory[cardId] --;
    setApplicationState({initialDecks: applicationState.initialDecks, initialInventory: inventory})
    console.log('!!!!!!!!!!!!!!!', inventory);
  }, [applicationState])
  // const buyCardForPlayer = (cardId) => setApplicationState((prevState) => console.log(prevState));

  useEffect(() => {
    console.log("INVENTORY UPDATED", applicationState.inventory)
  }, [applicationState.inventory]);
  console.log('this is the application state!!!', applicationState);
  return (
    <AppContext.Provider value={ {...applicationState, cards: initialCards, buyCard: buyCardForPlayer }}>
      { children }
      </AppContext.Provider>
  )
}
