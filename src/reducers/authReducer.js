import * as types from "../actions/type";

const initialState = {
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOGIN:
      console.log("set login...");
      break;
    default:
      return state;
  }
};
