export const initialState = {
  context: false,
  seeLyrics: false,
  playlists: [],
  selectedPlaylist: null,
  selectedPlaylistId: "",
  currentPlaying: null,
  playerState: false,
  musicPlayer: false,
};

export const playerReducer = (state, action) => {
  switch (action.type) {
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
    case "SET_PLAYLISTS": {
      return {
        ...state,
        playlists: action.playlists,
      };
    }
    case "SET_SELECTED_PLAYLISTS": {
      return {
        ...state,
        selectedPlaylists: action.selectedPlaylists,
      };
    }
    case "SET_PLAYLISTS_ID": {
      return {
        ...state,
        selectedPlaylistsId: action.selectedPlaylistsId,
      };
    }
    case "SET_PLAYER_STATE": {
      return {
        ...state,
        playerState: action.playerState,
      };
    }
    case "SET_MUSIC_PLAYER": {
      return {
        ...state,
        musicPlayer: action.musicPlayer,
      };
    }
    default: {
      return state;
    }
  }
};
