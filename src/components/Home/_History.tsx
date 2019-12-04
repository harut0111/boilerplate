import React, { useState, useEffect, useCallback } from "react";
import Loader from "../Loader";
import moment from "moment";
import fetchHistory from "../../fetch/fetchHistory";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import { HISTORY_TABLE_HEADERS } from "../../configs/constants";
import { IHistory } from "../../types/Global";
import { useStateValue } from "../../context";
import { loading, historyToState } from "../../context/actions";

const History = () => {
  const [pageStart, setPageStart] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [{ isLoading }, dispatchLoading]: any = useStateValue();
  const [{ history }, dispatchHistory]: any = useStateValue();

  const getHistory = async () => {
    dispatchLoading(loading(true));
    const historyVal = await fetchHistory();
    dispatchHistory(historyToState(historyVal));
    dispatchLoading(loading(false));
  };

  const memorizedHistory = useCallback(getHistory, []);

  useEffect(() => {
    memorizedHistory();
  }, [memorizedHistory]);

  const handlePaginate = (isNext?: boolean): void => {
    setCurrentPage(isNext ? currentPage + 1 : currentPage - 1);
    setPageStart(isNext ? currentPage * 10 : (currentPage - 1) * 10);
  };

  const renderModalHeader = (): JSX.Element => (
    <thead>
      <tr>
        {HISTORY_TABLE_HEADERS.map((header: string, index: number) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    </thead>
  );

  const renderTableBody = (): JSX.Element => {
    return (
      <tbody>
        {history
          .slice(pageStart, pageStart + 10)
          .map((history: IHistory, index: number) => (
            <tr key={index}>
              <td>{history.asset}</td>
              <td>{moment(history.startDate).format("hh:mm DD.MM.YY")}</td>
              <td>{history.startQuote}</td>
              <td>{moment(history.finishDate).format("hh:mm DD.MM.YY")}</td>
              <td>{history.finishQuote}</td>
              <td>{history.profit}</td>
            </tr>
          ))}
      </tbody>
    );
  };

  if (isLoading) return <Loader />;

  return (
    <div className="home-history">
      <table>
        {renderModalHeader()}
        {renderTableBody()}
      </table>
      <div className="home-history-pagination">
        <button disabled={currentPage < 2} onClick={() => handlePaginate()}>
          <IoIosArrowRoundBack
            size="30px"
            color={currentPage < 2 ? "gray" : "#1a237e"}
          />
        </button>
        {currentPage}/{10}
        <button
          disabled={currentPage >= 10}
          onClick={() => handlePaginate(true)}
        >
          <IoIosArrowRoundForward
            size="30px"
            color={currentPage >= 10 ? "gray" : "#1a237e"}
          />
        </button>
      </div>
    </div>
  );
};

export default History;
