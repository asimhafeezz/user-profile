import * as types from "../actions/type";

const initialState = {
  isAuth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ISAUTH:
      return {
        ...state,
        isAuth: action.payload,
      };
    default:
      return state;
  }
};
