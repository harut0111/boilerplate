import React, { useEffect } from 'react'
import fetchQuotes from '../../middleware/fetchQuotes';
import moment from "moment";
import {FaStar} from "react-icons/fa";
import { useStateValue } from '../../context';
import { quotesToState, loading } from '../../context/actions';
import Loader from '../Loader';

const Rate = () => {

    const [{quotes}, dispatchQuotes]: any = useStateValue();
    const [{ isLoading }, dispatchLoading]: any = useStateValue();
    
    const getQuotes = async () => {
        dispatchLoading(loading(true));
        const quotesVal = await fetchQuotes();
        dispatchQuotes(quotesToState(quotesVal));
        dispatchLoading(loading(false));
    }

    
    useEffect(() => {
        getQuotes()
    }, [])

    if(isLoading) return (
        <Loader />
    )

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
                    quotes.map((quote: any, index: number) => (
                        <tr key={index}>
                            <td>
                                <div className='home-rate-asset'>
                                    <span>
                                        <FaStar
                                            // onClick={() => handleQuoteFavoriteChange(index)}
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
