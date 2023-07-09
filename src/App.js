import { useEffect, useState } from "react";
import { CurrencyRow } from "./CurrencyRow";


const URL = `https://v6.exchangerate-api.com/v6/YOUR_KEY`

const BASE_URL = `${URL}/latest/USD`

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, SetExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  let toAmount, fromAmount
  if(amountInFromCurrency){
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => {
        const firstCurrency = Object.keys(data.conversion_rates)[1]
        setCurrencyOptions([...Object.keys(data.conversion_rates)])
        setFromCurrency(data.base_code)
        setToCurrency(firstCurrency)
        SetExchangeRate(data.conversion_rates[firstCurrency])
      })
  }, [])

  function handleFromAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }


  useEffect(() => {
    if (fromCurrency != null && toCurrency!= null){
      fetch(`${URL}/pair/${fromCurrency}/${toCurrency}`)
      .then(res => res.json())
      .then(data => SetExchangeRate(data.conversion_rate))
    }
  }, [fromCurrency, toCurrency])




  return (
    <div className="App">
      <div className="container">
        <h1>Convert app</h1>
        <CurrencyRow 
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          amount={fromAmount}
          onChangeCurrency={e => setFromCurrency(e.target.value)}
          onChangeAmount = {handleFromAmountChange}
        />
        <div className='equals'>=</div>
        <CurrencyRow 
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          amount={toAmount}
          onChangeCurrency={e => setToCurrency(e.target.value)}
          onChangeAmount = {handleToAmountChange}
        />
      </div>
    </div>
  );
}

export default App;
