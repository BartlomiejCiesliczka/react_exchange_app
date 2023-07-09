export function CurrencyRow({currencyOptions, onChangeCurrency, selectedCurrency, amount, onChangeAmount}) {
  return(
    <>
      <input type="number" className="input" value={amount} onChange={onChangeAmount}/>
          <select value={selectedCurrency} onChange={onChangeCurrency}>
            {currencyOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
    </>
  )
} 