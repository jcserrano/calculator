var CurrencyConverter = function(){
  this.objExchangeRate = {
    "EUR": {
      "USD": 1.123,
      "INR": 73.9965
    },
    "USD": {
      "EUR": 0.8945,
      "INR": 65.711
    }
  };

  this.calc = function(val, fromCurrency, toCurrency) {
    var eRate = this.getExchangeRate(fromCurrency, toCurrency);
    return Number((val * eRate).toFixed(2));
  };

  this.getExchangeRate = function(fromCurrency, toCurrency) {
    for (var iFromCurrency in this.objExchangeRate) {
      var defaultExchangeRate = this.objExchangeRate[iFromCurrency];
      if(iFromCurrency === fromCurrency) {
        for (var iToCurrency in defaultExchangeRate) {
          if(iToCurrency === toCurrency) {
            return defaultExchangeRate[iToCurrency];
          }
        }
      }
    }
  };
};
