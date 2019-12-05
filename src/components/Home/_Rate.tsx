import React, { useEffect, useCallback } from "react";
import fetchQuotes from "../../fetch/fetchQuotes";
import moment from "moment";
import Loader from "../Loader";
import { useStateValue } from "../../context";
import { quotesToState, loading } from "../../context/actions";

const Rate = () => {
  const [{ quotes }, dispatchQuotes]: any = useStateValue();
  const [{ isLoading }, dispatchLoading]: any = useStateValue();

  const getQuotes = async () => {
    dispatchLoading(loading(true));
    const quotesVal = await fetchQuotes();
    dispatchQuotes(quotesToState(quotesVal));
    dispatchLoading(loading(false));
  };

  const memorizedQuotes = useCallback(getQuotes, []);

  useEffect(() => {
    memorizedQuotes();
  }, [memorizedQuotes]);

  if (isLoading) return <Loader />;
  return (
    <div className="home-rate">
      <table>
        <thead>
          <tr>
            <th>Currency pair</th>
            <th>Quotation</th>
            <th>Date of receiving</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote: any, index: number) => (
            <tr key={index}>
              <td>{quote.asset}</td>
              <td>{quote.quote}</td>
              <td>{moment(quote.startDate).format("hh:mm DD.MM.YY")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rate;
