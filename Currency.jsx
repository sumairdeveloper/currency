import React from 'react'
import './Currency.css'

const Currency = () => { const currencyUrl = "https://open.er-api.com/v6/latest/";
    const flagUrl = "https://countryflagsapi.com/png/";

    async function populateCurrencies() {
        const response = await fetch(currencyUrl + "USD");
        const data = await response.json();
        const currencies = Object.keys(data.rates);

        let options = "";
        currencies.forEach(currency => {
            options += `<option value="${currency}">${currency}</option>`;
        });

        document.getElementById('fromCurrency').innerHTML = options;
        document.getElementById('toCurrency').innerHTML = options;
    }

    async function convertCurrency() {
        const amount = document.getElementById('amount').value;
        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;

        const response = await fetch(currencyUrl + fromCurrency);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const result = amount * rate;

        document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;

        const flagCode = toCurrency.slice(0, 2).toLowerCase();
        document.getElementById('flag').src = flagUrl + flagCode;
        
    }

    window.onload = populateCurrencies;

  return (
    
       <div class="container">
            <h2>Currency Exchanger</h2>
            <label for="amount">Amount:</label>
            <input type="number" id="amount" placeholder="Enter amount" />
    
            <label for="fromCurrency">From Currency:</label>
            <select id="fromCurrency"></select>
    
            <label for="toCurrency">To Currency:</label>
            <select id="toCurrency"></select>
    
            <button onclick="convertCurrency()">Convert</button>
    
            <h3 id="result"></h3>
    </div>
  )
}

export default Currency
    
    
    
   

       