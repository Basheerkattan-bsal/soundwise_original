export const initialState = {
  contextUri: false,
  contextUris: false,
  context: false,
  offset: "",
  currentObject: false,
  seeLyrics: false,
  currentPlaying: null,
  playerState: false,
  playingTrack: null,
};

export const playerReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTEXT_URI": {
      return {
        ...state,
        contextUri: action.contextUri,
      };
    }
    case "SET_CONTEXT_URIS": {
      return {
        ...state,
        contextUris: action.contextUris,
      };
    }
    case "OFFSET": {
      return {
        ...state,
        offset: action.offset,
      };
    }
    case "SET_CONTEXT": {
      return {
        ...state,
        context: action.context,
      };
    }
    case "SET_SEE_LYRICS": {
      return {
        ...state,
        seeLyrics: !state.seeLyrics,
      };
    }

    case "SET_PLAYING": {
      return {
        ...state,
        currentPlaying: action.currentPlaying,
      };
    }
    case "SET_CURRENT_PLAYING": {
      return {
        ...state,
        currentTrack: action.currentTrack,
      };
    }
    case "SET_PLAY_STATE": {
      return {
        ...state,
        playerState: action.playerState,
      };
    }
    default: {
      return state;
    }
  }
};
