import React, { useState, useEffect } from 'react';
import './Currency.css';

const Currency = () => {
  const currencyUrl = "https://open.er-api.com/v6/latest/";
  const flagUrl = "https://countryflagsapi.com/png/";

  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState("");
  const [flag, setFlag] = useState("");

  useEffect(() => {
    const fetchCurrencies = async () => {
      const response = await fetch(currencyUrl + "USD");
      const data = await response.json();
      setCurrencies(Object.keys(data.rates));
    };
    fetchCurrencies();
  }, []);

  const convertCurrency = async () => {
    if (!amount || !fromCurrency || !toCurrency) return;

    const response = await fetch(currencyUrl + fromCurrency);
    const data = await response.json();
    const rate = data.rates[toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);

    setResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);

    const flagCode = toCurrency.slice(0, 2).toLowerCase();
    setFlag(flagUrl + flagCode);
  };

  return (
    <div className="container">
      <h2>Currency Exchanger</h2>

      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />

      <label htmlFor="fromCurrency">From Currency:</label>
      <select
        id="fromCurrency"
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      <label htmlFor="toCurrency">To Currency:</label>
      <select
        id="toCurrency"
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      <button onClick={convertCurrency}>Convert</button>

      <h3>{result}</h3>
      {flag && <img id="flag" src={flag} alt="Country Flag" />}
    </div>
  );
};

export default Currency;