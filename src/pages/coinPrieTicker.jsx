// Create a horizontal scrolling coin ticker using hardcoded coin data.
// Use React functional component. Each coin should show icon, name, and price.
// Animate scrolling to the left using CSS.
import React, { useState, useEffect } from 'react';
import '../styles/coinPriceTicker.css';

const CryptoTicker = () => {
  const cryptoData = [
    { id: 1, name: 'Bitcoin', price: 118517.99, icon: 'bitcoin-btc-logo.png' },
    { id: 2, name: 'Ethereum', price: 3679.31, icon: 'ethereum-eth-logo.png' },
    { id: 3, name: 'XRP', price: 3.16, icon: 'xrp-xrp-logo.png' },
    { id: 4, name: 'Litecoin', price: 200.00, icon: 'litecoin-ltc-logo.png' }, // Price not available; placeholder used
    { id: 5, name: 'Cardano', price: 0.87, icon: 'cardano-ada-logo.png' },
    { id: 6, name: 'Polkadot', price: 25.00, icon: 'polkadot-new-dot-logo.png' }, // Price not available; placeholder used
    { id: 7, name: 'Chainlink', price: 18.05, icon: 'chainlink-link-logo.png' },
    { id: 8, name: 'Dogecoin', price: 0.2604, icon: 'dogecoin-doge-logo.png' },
    { id: 9, name: 'Solana', price: 147.53, icon: 'solana-sol-logo.png' },
    { id: 10, name: 'Uniswap', price: 10.61, icon: 'uniswap-uni-logo.png' }
  ];

  return (
    <div className="crypto-ticker">
      {cryptoData.map(coin => (
        <div className="crypto-item" key={coin.id}>

          <img src={coin.icon} alt={coin.name} className="crypto-icon" />
          <span className="crypto-name">{coin.name}</span>
          <span className="crypto-price">${coin.price.toLocaleString()}</span>

        </div>
      ))}
    </div>
  );
};

export default CryptoTicker;

//   useEffect(() => {
//     const fetchCryptoData = async () => {
//       const response = await fetch('https://api.coingecko.com/api/v3/coins/markets', {
//         method: 'GET',
//         headers: {
//           'Accept': 'application/json',
//         },
//         params: {
//           'vs_currency': 'usd',
//           'order': 'market_cap_desc',
//           'per_page': 10,
//           'page': 1,
//           'sparkline': false
//         }
//       });
//       const data = await response.json();
//       setCryptoData(data);
//     };

//     fetchCryptoData();
//   }, []);

//   return (
//     <div className="crypto-ticker">
//       {cryptoData.map(coin => (
//         <div className="crypto-item" key={coin.id}>
//           <span className="crypto-name">{coin.name}</span>
//           <span className="crypto-price">${coin.current_price.toLocaleString()}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CryptoTicker;