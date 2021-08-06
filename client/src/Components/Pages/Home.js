import React, {useState, useEffect} from 'react';
import axios from 'axios';



const Home=(props)=>{
    const [price, setPrice] = useState(0);
    
    useEffect(() => {
        axios.get("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
            .then((res) => {
                setPrice(res.data.price)
                console.log(res.data.price)
            }
        )
        .catch((error) => {
            console.log(error);
        });
    }, [price]);

return (
    <div>
    <h2> Home</h2>
    <p>Bitcoin in USD: {price}</p>
    </div>
)};

export default Home;
