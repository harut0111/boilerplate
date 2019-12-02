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
