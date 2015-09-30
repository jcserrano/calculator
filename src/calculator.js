var objExchangeRate = {
  "EUR": {
    "USD": 1.123,
    "INR": 73.9965
  }
};

function calc(num1, num2, op) {
  switch(op) {
    case "+":
      return Number(num1) + Number(num2);
      break;
    case "-":
      return Number(num1) - Number(num2);
      break;
    case "*":
      return  Number(num1) * Number(num2);
    case "/":
      return Number(num1) / Number(num2);
      break;
    default:
      return NaN
  }
}

function currencyConverter(num, fromCurrency, toCurrency){
  for (var iFromCurrency in objExchangeRate) {
    var defaultExchangeRate = objExchangeRate[iFromCurrency]
    if(iFromCurrency == fromCurrency) {
      for (var iToCurrency in defaultExchangeRate) { 
        if(iToCurrency == toCurrency) {
          return Number(calc(num, defaultExchangeRate[iToCurrency], '*').toFixed(2));
        }
      }
    }
  }
}
