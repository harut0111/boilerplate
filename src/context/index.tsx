import React, { createContext, useContext, useReducer } from "react";
import { Context } from "vm";

export const StateContext: any = createContext<Partial<Context>>(null);
export const StateProvider = ({ reducer, initialState, children }: any) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);
