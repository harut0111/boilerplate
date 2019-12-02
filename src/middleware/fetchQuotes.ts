import React, {useEffect} from "react";
import API from "../api";
import {IQuote} from "../types/Global";

// export default function fetchQuotes() {
//     const [loading, setLoading] = React.useState<boolean>(true);
//     const [quotes, setQuotes] = React.useState<IQuote[]>([]);
//     const [availablePageCount] = React.useState<number>(0);
//     const handleQuoteFavoriteChange = (quoteIndex: number) => {
//         const quoteCopy: IQuote[] = [...quotes];
//         quoteCopy[quoteIndex].isFavorite = !quoteCopy[quoteIndex].isFavorite;
//         setQuotes(quoteCopy.sort( (x: IQuote, y: IQuote) => (Number(y.isFavorite) - Number(x.isFavorite))));
//     };

 
    
//     useEffect(() => {
//         fetchQuote();
//     },[])

//     return {
//         loading,
//         quotes,
//         availablePageCount,
//         handleQuoteFavoriteChange
//     }
// }


export default async function fetchQuote() {
    const response = await API.getQuote();
    const result = await response.json();
    if(result.result === "ok") return result.assets;
    else console.log('error of fetchQuote')
}