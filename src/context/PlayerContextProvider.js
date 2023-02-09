import React, { useReducer } from 'react';
import PlayerContext from './PlayerContext.js';
import {initialState, playerReducer} from './PlayerReducer.js'

function PlayerContextProvider({ children }) {
  const [player, playerDispatch] = useReducer(playerReducer, initialState);

  return (
    <PlayerContext.Provider value={[player, playerDispatch]}>
      {children}
    </PlayerContext.Provider>
  );
}

export default PlayerContextProvider;
