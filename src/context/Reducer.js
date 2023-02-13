export const initialState = {
  token: "",
  featuredPlaylists: null,
  playListTracks: [],
  playlist: null,
  newRelease: null,
  albums: [],
  search: null,
  user: null,
  login: false,
  catPlaylist: false,
  hashToken: null,
};

export const mainReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN": {
      return {
        ...state,
        token: action.token,
      };
    }
    case "SET_HASH_TOKEN": {
      return {
        ...state,
        hashToken: action.hashToken,
      };
    }
    case "SET_USER": {
      return {
        ...state,
        user: action.user,
      };
    }
    case "SET_PLAYLIST_TRACKS": {
      return {
        ...state,
        playListTracks: action.playListTracks,
      };
    }
    case "SET_PLAYLIST": {
      return {
        ...state,
        playlist: action.playlist,
      };
    }
    case "SET_NEW_RELEASE": {
      return {
        ...state,
        newRelease: action.newRelease,
      };
    }
    case "SET_ALBUMS": {
      return {
        ...state,
        albums: action.albums,
      };
    }
    case "SET_FEATURED_PLAYLISTS": {
      return {
        ...state,
        featuredPlaylists: action.featuredPlaylists,
      };
    }
    case "SET_SEARCH": {
      return {
        ...state,
        search: action.search,
      };
    }
    case "SET_CAT_PLAYLIST": {
      return {
        ...state,
        catPlaylist: action.catPlaylist,
      };
    }

    default: {
      return state;
    }
  }
};
