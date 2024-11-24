import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchCoinData = (coinIds = [], currency = 'usd', balance) => {

    console.log(balance);
    const [coinData, setCoinData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCoinData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: currency,
                        ids: coinIds.join(','),
                    },
                });

                const adaptedData = response.data.map((coin, index) => ({
                    id: (index + 1).toString(),
                    coin: coin.image,
                    coinName: coin.name,
                    amount: `$${coin.current_price.toFixed(2)}`,
                    trade: `${coin.price_change_percentage_24h.toFixed(2)}%`,
                    tag: coin.symbol.toUpperCase(),
                    tokenId: coin.id,
                    balance: parseFloat(balance[coin.id]).toFixed(4) || 0,
                    usdValue: balance[coin.id] * coin.current_price
                }));

                setCoinData(adaptedData);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch data');
                setLoading(false);
            }
        };

        fetchCoinData();
    }, [balance]);

    return { coinData, loading, error };
};

export default useFetchCoinData;