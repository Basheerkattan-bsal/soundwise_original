export const initialState = {
  catId: "",
  catName: "",
  playLists: null,
  navReminder: false,
  navReminderMsg: "",
  songReminder: false,
  songInfo: null,
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
    case "SET_NAV_REMINDER": {
      return {
        ...state,
        navReminder: action.navReminder,
      };
    }
    case "SET_NAV_REMINDER_MSG": {
      return {
        ...state,
        navReminderMsg: action.navReminderMsg,
      };
    }
    case "SET_SONG_REMINDER": {
      return {
        ...state,
        songReminder: action.songReminder,
      };
    }
    case "SET_SONG_INFO": {
      return {
        ...state,
        songInfo: action.songInfo,
      };
    }
    default: {
      return state;
    }
  }
};
