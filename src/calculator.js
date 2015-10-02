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
