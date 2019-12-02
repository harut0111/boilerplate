import React from 'react'
import {useQuote} from "../../hooks/useQuote";
import moment from "moment";
import {FaStar} from "react-icons/fa";

const Rate = () => {
    const { quotes, handleQuoteFavoriteChange } = useQuote();

    return (
        <div className='home-rate'>
            <table>
                <thead>
                    <tr>
                        <th>Валютная пара </th>
                        <th>Котировка</th>
                        <th>Дата получения</th>
                    </tr>
                </thead>
                <tbody>
                {
                    quotes.map((quote, index) => (
                        <tr key={index}>
                            <td>
                                <div className='home-rate-asset'>
                                    <span>
                                        <FaStar
                                            onClick={() => handleQuoteFavoriteChange(index)}
                                            style={{color: !quote.isFavorite ?  "gray": "#1a237e", cursor: "pointer"}}
                                        />
                                    </span>
                                    <span>{quote.asset}</span>
                                </div>
                            </td>
                            <td>{quote.quote}</td>
                            <td>{moment(quote.startDate).format("hh:mm DD.MM.YY")}</td>
                        </tr>
                    ))
                }
                    </tbody>
                </table>
        </div>
    )
};

export default Rate
