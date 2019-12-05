import React, {useEffect} from "react";
import API from "../api";
import {IHistory} from "../types/Global";

export function useHistory() {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [history, setHistory] = React.useState<IHistory[]>([]);
    const [availablePageCount, setPageCount] = React.useState<number>(0);

    async function fetchHistory(): Promise<any> {
        const response = await API.getHistory();
        const result = await response.json();
        if(result.result === "ok"){
            setHistory(result.deals);
            setLoading(false);
            setPageCount(result.deals.length / 10);
        }
    }

    useEffect(() => {
        fetchHistory()
    },[])

    return {
        loading,
        history,
        availablePageCount
    }
}