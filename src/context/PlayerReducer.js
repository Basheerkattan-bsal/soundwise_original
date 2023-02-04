export const initialState = {
  context: null,
  isLyric: false,
};

export const playerReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTEXT": {
      return {
        ...state,
        context: action.context,
      };
    }
    case "SET_IS_LYRIC": {
      return {
        ...state,
        isLyric: !state.isLyric,
      };
    }
    default: {
      return state;
    }
  }
};
