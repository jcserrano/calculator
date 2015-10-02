(function () {
  'use strict';

  describe('A simple calculator', function() {
    var calc;
    beforeEach(function() {
      calc = new Calculator();
    });

    it('can add positive integers', function() {
      expect(calc.add(3,1)).toEqual(4);
    });

    it("can subtract positive integers", function() {
      expect(calc.sub(8,5)).toEqual(3);
    });

    it("can multiply positive integers", function() {
      expect(calc.mult(4,3)).toEqual(12);
    });

    it("can divide positive integers", function() {
      expect(calc.div(12,4)).toEqual(3);
    });
  });

  describe('A calculator with currency converter', function() {
    var fakeConverter;
    var calcWithFkConv;

    beforeEach(function() {
      fakeConverter = jasmine.createSpyObj('CurrencyConverter', ['calc', 'getExchangeRate']);
      calcWithFkConv = new Calculator(fakeConverter);
    });

    it("A spy converter calls the calc function", function() {
      calcWithFkConv.currencyConverter(50, "EUR", "INR");

      expect(fakeConverter.calc).toHaveBeenCalled();
    });

    it("A spy converter calls one time the calc function", function() {
      calcWithFkConv.currencyConverter(10, "EUR", "USD");

      expect(fakeConverter.calc.calls.count()).toEqual(1);
    });

    it("A spy converter tracks all the arguments in the calc function", function() {
      calcWithFkConv.currencyConverter(10, "EUR", "USD");
      calcWithFkConv.currencyConverter(50, "EUR", "INR");

      expect(fakeConverter.calc).toHaveBeenCalledWith(10, "EUR", "USD");
      expect(fakeConverter.calc).toHaveBeenCalledWith(50, "EUR", "INR");
    });

    it("A spy converter is configured to fake a return value in the calc function", function() {
      fakeConverter.calc.and.callFake(function() {
        return 0;
      });

      var result = calcWithFkConv.currencyConverter(50, "EUR", "INR");
      var result1 = calcWithFkConv.currencyConverter(10, "USD", "INR");

      expect(result).toEqual(0);
      expect(result1).toEqual(0);
    });
  });

  describe('A currency converter', function() {
    var converter;
    beforeEach(function() {
      converter = new CurrencyConverter();
    });

    it('should can convert Euros (EUR) to US Dollars (USD)', function() {
      var result = converter.calc(10, "EUR", "USD");

      expect(result).toEqual(11.23);
    });

    it('should can convert Euros (EUR) to Indian Rupee (INR)', function() {
      var result = converter.calc(50, "EUR", "INR");

      expect(result).toEqual(3699.82);
    });

    it('should get exchange rate with  correct currency', function() {
      var rate = converter.getExchangeRate("EUR", "INR");

      expect(rate).toEqual(73.9965);
    });

    it('should not get exchange rate  with incorrect fromCurrency', function() {
      var rate = converter.getExchangeRate("FRA", "INR");

      expect(rate).toBeUndefined();
    });

    it('should not get exchange rate with incorrect toCurrency', function() {
      var rate = converter.getExchangeRate("EUR", "FRA");

      expect(rate).toBeUndefined();
    });
  });
})();