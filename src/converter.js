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

  function haveFromCurrency(fCurrency) {
    return objExchangeRate.hasOwnProperty(fCurrency);
  }

  function haveToCurrency(fCurrency, tCurrency) {
    return objExchangeRate[fCurrency].hasOwnProperty(tCurrency);
  }

  function searchRate(fCurrency, tCurrency) {
    var rate;
    if (haveFromCurrency(fCurrency) && haveToCurrency(fCurrency, tCurrency)){
      rate = objExchangeRate[fCurrency][tCurrency];
    }
    return rate;
  }

  function getExchangeRate(fromCurrency, toCurrency, inv) {
    var value;
    var rate = searchRate(fromCurrency, toCurrency);
    if(!inv) {
      value = (typeof rate !== 'undefined') ? rate : getExchangeRate(toCurrency, fromCurrency, true);
    } else {
      value = (typeof rate !== 'undefined') ? (1/rate) : null;
    }
    return value;
  }

  return {
    calc: function(val, fromCurrency, toCurrency) {
      var eRate = getExchangeRate(fromCurrency, toCurrency, false);
      return Number((val * eRate).toFixed(2));
    }
  };
})();

module.exports = converterModule;
