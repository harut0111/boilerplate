import State from "../types/State";
import Action from "../types/Action";
import {
  LOGIN_SUCCEEDED,
  LOADING,
  GET_QUOTES_DATA,
  GET_HISTORY_DATA
} from "./actions";

export const initialState = {
  isLoading: false,
  isLoggedIn: false,
  history: [""],
  quotes: [""]
};

export const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case LOADING: {
      return { ...state, isLoading: payload };
    }
    case LOGIN_SUCCEEDED: {
      return { ...state, isLoggedIn: true };
    }
    case GET_QUOTES_DATA: {
      return { ...state, quotes: payload };
    }
    case GET_HISTORY_DATA: {
      return { ...state, history: payload };
    }
    default:
      return state;
  }
};
