var Calculator = function(converter){
  this.add = function(num1, num2) {
    return Number(num1) + Number(num2);
  };

  this.sub = function(num1, num2) {
    return Number(num1) - Number(num2);
  };

  this.mult = function(num1, num2) {
    return Number(num1) * Number(num2);
  };

  this.div = function(num1, num2) {
    return Number(num1) / Number(num2);
  };

  this.currencyConverter = function(value, fromCurrency, toCurrency) {
    return converter.calc(value, fromCurrency, toCurrency);
  };
};

var CurrencyConverter = function(){
  this.objExchangeRate = {
    "EUR": {
      "USD": 1.123,
      "INR": 73.9965
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
      } else {
        return undefined;
      }
    }
  };
};
