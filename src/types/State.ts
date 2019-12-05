import { IQuote, IHistory } from "./Global";

export default interface State {
  isLoading: boolean;
  isLoggedIn: boolean;
  history: IHistory[];
  quotes: IQuote[];
}
