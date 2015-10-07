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

  function getFromCurrency(fCurrency) {
    var from;
    for (var iFromCurrency in objExchangeRate) {
      if(iFromCurrency === fCurrency) {
        from = objExchangeRate[iFromCurrency];
      }
    }
    return from;
  }

  function getToCurrency(exchangeRate, tCurrency) {
    var to;
    for (var iToCurrency in exchangeRate) {
      if(iToCurrency === tCurrency) {
        to = exchangeRate[iToCurrency];
      }
    }
    return to;
  }

  function getExchangeRate(fromCurrency, toCurrency) {
    var exchangeRate;
    var fCurrency = getFromCurrency(fromCurrency);
    if (fCurrency) {
      exchangeRate = getToCurrency(fCurrency, toCurrency);
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
