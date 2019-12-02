import React, {createContext, useContext, useReducer} from 'react';
// import State from '../types/State'

export const StateContext: any = createContext(null);
export const StateProvider = ({reducer, initialState, children}: any) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);
