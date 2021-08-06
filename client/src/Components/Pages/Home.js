import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format';

const Home = (props) => {
    const [price, setPrice] = useState();
    useEffect(() => {
        const fetchPrice = () => {
            axios.get("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
                .then((res) => {
                    setPrice(res.data.price)
                    console.log(res.data.price)
                }
                )
                .catch((error) => {
                    console.log(error);
                });
        }
        const interval = setInterval(() => fetchPrice(), 2000);
        return () => {
            clearInterval(interval);
        }
    }, [price]);
    return (
        <React.Fragment>
            <div className="content-wrapper">
            <h2> Home</h2>
            {price && (
                <div>
                    <div>Bitcoin in USD: </div>
                    <NumberFormat
                        value={price}
                        displayType={'text'}
                        type="number"
                        decimalScale={2}
                        thousandSeparator={true}
                        prefix={'$'}
                    />
                </div>
            )}
            {!price && <p>Loading...</p>}
            </div>
        </React.Fragment>
    )
};
export default Home;