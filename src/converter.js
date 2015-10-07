var converterModule = (function () {
  var objExchangeRate = {
    "EUR": {
      "USD": 1.123,
      "INR": 73.9965
    },
    "USD": {
      "EUR": 0.8945,
      "INR": 65.711
    }
  };

  function getExchangeRate(fromCurrency, toCurrency) {
    var exchangeRate;
    if (objExchangeRate.hasOwnProperty(fromCurrency)) {
      exchangeRate = objExchangeRate[fromCurrency][toCurrency];
    }
    return exchangeRate;
  }

  return {
    calc: function(val, fromCurrency, toCurrency) {
      var eRate = getExchangeRate(fromCurrency, toCurrency);
      return Number((val * eRate).toFixed(2));
    }
  };
})();

module.exports = converterModule;
