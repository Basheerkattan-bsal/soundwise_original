import React, { useReducer } from 'react';
import DisplayContext from './DisplayContext.js';
import {initialState, displayReducer} from './DisplayReducer.js'

function DisplayContextProvider({ children }) {
  const [display, dispatch] = useReducer(displayReducer, initialState);

  return (
    <DisplayContext.Provider value={[display, dispatch]}>
      {children}
    </DisplayContext.Provider>
  );
}

export default DisplayContextProvider;
