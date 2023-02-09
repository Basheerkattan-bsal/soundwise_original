export const initialState = {
  catId: "",
  catName: "",
  tracks: null,
  playLists: null,
  activePlaylist: null,
  artistId: "",
  singleId: "",
};

export const displayReducer = (state, action) => {
  switch (action.type) {
    case "SET_PLAYLISTS": {
      return {
        ...state,
        playLists: action.playLists,
      };
    }
    case "SET_CAT_ID": {
      return {
        ...state,
        catId: action.catId,
      };
    }
    case "SET_CAT_NAME": {
      return {
        ...state,
        catName: action.catName,
      };
    }
    case "SET_TRACKS": {
      return {
        ...state,
        tracks: action.tracks,
      };
    }
    case "SET_ACTIVE_PLAYLIST": {
      return {
        ...state,
        activePlaylist: action.activePlaylist,
      };
    }
    case "SET_ARTIST_ID": {
      return {
        ...state,
        artistId: action.artistId,
      };
    }
    case "SET_SINGLE_ID": {
      return {
        ...state,
        singleId: action.singleId,
      };
    }

    default: {
      return state;
    }
  }
};
