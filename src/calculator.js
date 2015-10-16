var converter = require('./converter.js');

var calculatorModule = (function () {
  return {
    add: function(num1, num2) {
      return Number(num1) + Number(num2);
    },

    sub: function(num1, num2) {
      return Number(num1) - Number(num2);
    },

    mult: function(num1, num2) {
      return Number(num1) * Number(num2);
    },

    div: function(num1, num2) {
      return Number(num1) / Number(num2);
    },

    currencyConverter: function(value, fromCurrency, toCurrency) {
      return converter.calc(value, fromCurrency, toCurrency);
    }
  };
})();

module.exports = calculatorModule;
