var converterModule = (function () {
  var objExchangeRate = {
    "EUR": {
      "USD": 1.123,
      "INR": 73.9965
    },
    "USD": {
      "INR": 65.711
    }
  };

  function searchRate(fCurrency, tCurrency) {
    return objExchangeRate[fCurrency] && objExchangeRate[fCurrency][tCurrency];
  }

  function getRateInv(fromCurrency, toCurrency) {
    var value;
    var rate = searchRate(fromCurrency, toCurrency);
    value = (typeof rate !== 'undefined') ? (1/rate) : null;
    return value;
  }

  function getExchangeRate(fromCurrency, toCurrency) {
    var value;
    var rate = searchRate(fromCurrency, toCurrency);
    value = (typeof rate !== 'undefined') ? rate : getRateInv(toCurrency, fromCurrency);
    return value;
  }

  return {
    calc: function(val, fromCurrency, toCurrency) {
      var eRate = getExchangeRate(fromCurrency, toCurrency);
      return Number((val * eRate).toFixed(2));
    }
  };
})();

module.exports = converterModule;
