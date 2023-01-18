export const initialState = {
  token: "",
  playLists: null,
  featuredPlaylists: null,
  playListTracks: [],
  newRelease: null,
  albums: [],
  search: null,
  user: null,
  login: false,
};

export const mainReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN": {
      return {
        ...state,
        token: action.token,
      };
    }

    case "SET_USER": {
      return {
        ...state,
        user: action.user,
      };
    }
    case "SET_PLAYLISTS": {
      return {
        ...state,
        playLists: action.playLists,
      };
    }
    case "SET_PLAYLIST_TRACKS": {
      return {
        ...state,
        playListTracks: action.playListTracks,
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

    default: {
      return state;
    }
  }
};
