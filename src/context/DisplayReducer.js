export const initialState = {
  catId: "",
  catName: "",
  playLists: null,
  navReminder: false,
  navReminderMsg: "",
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
    default: {
      return state;
    }
  }
};
