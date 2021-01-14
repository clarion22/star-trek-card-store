import { createContext, useState, useContext } from 'react';
import initialCards from '../mockdata/CardData'
export const AppContext = createContext();
export const useApp = () => useContext(CoffeeContext);

export function AppContextProvider({children}) {
  return (
    <AppContext.Provider value={ {cards: initialCards }}>
      { children }
      </AppContext.Provider>
  )
}
//this is a comment
