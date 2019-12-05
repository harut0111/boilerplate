import { Provider, Consumer } from "react";

export interface IQuote {
  isFavorite?: boolean;
  asset: string;
  quote: number;
  startDate: number;
}

export interface IHistory {
  asset: string;
  startDate: string;
  startQuote: string;
  finishDate: string;
  finishQuote: string;
  profit: number;
}

export interface Context<T> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
    displayName?: string;
}