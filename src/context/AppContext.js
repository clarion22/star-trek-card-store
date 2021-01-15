import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import {initialDecks, initialInventory, initialCards} from '../mockdata/CardData'
export const AppContext = createContext();
export const useApp = () => useContext(AppContext);


export function AppContextProvider({children}) {

  const [applicationState, setApplicationState] = useState({initialDecks, initialInventory});

  const updateDeck = useCallback((cardId)=>{
    let containsCard = false;
    let matchId = null;
    const initDecks = initialDecks;
    initDecks[0].cards.forEach((card, index) => {
      if(card.id === cardId){
        containsCard = true;
        matchId = index;
      }
    });
    if(containsCard) {
      initDecks[0].cards[matchId]++;
    } else {
      initDecks[0].cards.push(initialCards.find((card) => card.id === cardId))
    }
    setApplicationState({initialDecks: initDecks, initialInventory})
  },[applicationState])

  const buyCardForPlayer = useCallback((cardId) => {
    const inventory = applicationState.initialInventory;
    if (inventory[cardId] > 0) inventory[cardId] --;
    setApplicationState({initialDecks: applicationState.initialDecks, initialInventory: inventory})
    updateDeck(cardId);
    console.log('!!!!!!!!!!!!!!!', applicationState.initialDecks);
  }, [applicationState, updateDeck])


  useEffect(() => {
    console.log("INVENTORY UPDATED", applicationState.inventory)
  }, [applicationState.inventory]);

  return (
    <AppContext.Provider value={ {...applicationState, cards: initialCards, buyCard: buyCardForPlayer }}>
      { children }
      </AppContext.Provider>
  )
}
