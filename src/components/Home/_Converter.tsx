import React, { useState, useEffect, useRef, SyntheticEvent } from "react";
import { useStateValue } from "../../context";

const Converter = () => {
  const [{ quotes }]: any = useStateValue();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [quoteList, setQuoteList] = useState<string[]>([]);
  const [amount, setAmount] = useState(1);
  const [quoteVal, setQuoteVal] = useState(1);

  const amountnEl = useRef(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setAmount(amountnEl.current.value);

    if (from === to) setQuoteVal(1);
    else {
      for (const item of quotes) {
        if (item.asset === `${from}/${to}`) {
          setQuoteVal(Number(item.quote));
          break;
        }
        setQuoteVal(undefined);
      }
    }
  };

  useEffect(() => {
    let uniqueQuotes: string[] = [];
    const mixQuotes: string[] = quotes.map(
      (item: { asset: string }) => item.asset
    );
    mixQuotes.forEach(item =>
      uniqueQuotes.push(item.split("/")[0], item.split("/")[1])
    );
    uniqueQuotes = Array.from(new Set(uniqueQuotes).values());
    setQuoteList(uniqueQuotes);
    setFrom(uniqueQuotes[0]);
    setTo(uniqueQuotes[1]);
  }, [quotes]);

  const options1 = quoteList.map((item: string, index: number) => {
    return item !== to ? (
      <option value={`${item}`} key={index}>
        {item}
      </option>
    ) : null;
  });

  const options2 = quoteList.map((item: string, index: number) => {
    return item !== from ? (
      <option value={`${item}`} key={index}>
        {item}
      </option>
    ) : null;
  });

  return (
    <div className="home-convertor">
      <table>
        <thead>
          <tr>
            <th>Currency conversion</th>
          </tr>
        </thead>
      </table>
      <div className="home-convertor-content">
        <form onSubmit={handleSubmit}>
          <input type="number" defaultValue={1} ref={amountnEl} />
          <select
            className="listquotes"
            value={from}
            onChange={e => setFrom(e.target.value)}
          >
            {options1}
          </select>
          <select
            className="listquotes"
            value={to}
            onChange={e => setTo(e.target.value)}
          >
            {options2}
          </select>
          <button type="submit">Calculate</button>
        </form>
        <div className="home-convertor-result">
          <span>Total</span>
          <span>
            {quoteVal ? (
              amount * quoteVal
            ) : (
              <span style={{ color: "red" }}>quote is not available</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Converter;
