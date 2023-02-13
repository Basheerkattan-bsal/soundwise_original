export const initialState = {
  context: null,
  trackPlayer: false,
  seeLyrics: false,
  playlists: [],
  selectedPlaylist: null,
  selectedPlaylistId: "6ktXKmv6PQlkKTgM7TZKHO",
  currentPlaying: null,
  playerState: false,
};

export const playerReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTEXT": {
      return {
        ...state,
        context: action.context,
      };
    }
    case "SET_TRACK_PLAYER": {
      return {
        ...state,
        trackPlayer: action.trackPlayer,
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
    case "SET_PLAYLISTS": {
      return {
        ...state,
        playlists: action.playlists,
      };
    }
    case "SET_SELECTED_PLAYLISTS": {
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    }
    case "SET_PLAYLISTS_ID": {
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    }
    case "SET_PLAYER_STATE": {
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
