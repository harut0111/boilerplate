import { IQuote, IHistory } from "../types/Global";

export const LOADING = "LOADING";
export const ATTEMPT_LOGIN = "ATTEMPT_LOGIN";
export const LOGIN_SUCCEEDED = "LOGIN_SUCCEEDED";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const UPDATE_HISTORY = "UPDATE_HISTORY";
export const GET_QUOTES_DATA = "GET_QUOTES_DATA";
export const GET_HISTORY_DATA = "GET_HISTORY_DATA";

export const loginSucceeded = () => ({ type: LOGIN_SUCCEEDED });
export const loginFail = () => ({ type: LOGIN_FAILED });
export const loading = (isLoading: boolean) => ({
  type: LOADING,
  payload: isLoading
});
export const quotesToState = (quotes: IQuote) => ({
  type: GET_QUOTES_DATA,
  payload: quotes
});
export const historyToState = (history: IHistory) => ({
  type: GET_HISTORY_DATA,
  payload: history
});
