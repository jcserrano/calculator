(function () {
  'use strict';

  var converter = require('../../src/converter.js');
  var calculator = require('../../src/calculator.js');

  describe('A simple calculator', function() {
    it('can add positive integers', function() {
      expect(calculator.add(3,1)).toEqual(4);
    });

    it("can subtract positive integers", function() {
      expect(calculator.sub(8,5)).toEqual(3);
    });

    it("can multiply positive integers", function() {
      expect(calculator.mult(4,3)).toEqual(12);
    });

    it("can divide positive integers", function() {
      expect(calculator.div(12,4)).toEqual(3);
    });
  });

  describe('A calculator with currency converter', function() {
    var fakeConverter;

    beforeEach(function() {
      fakeConverter = jasmine.createSpyObj('CurrencyConverter', ['calc']);
      calculator.addConverter(fakeConverter);
    });

    it("A spy converter calls the calc function", function() {
      calculator.currencyConverter(50, "EUR", "INR");

      expect(fakeConverter.calc).toHaveBeenCalled();
    });

    it("A spy converter calls one time the calc function", function() {
      calculator.currencyConverter(10, "EUR", "USD");

      expect(fakeConverter.calc.calls.count()).toEqual(1);
    });

    it("A spy converter tracks all the arguments in the calc function", function() {
      calculator.currencyConverter(10, "EUR", "USD");
      calculator.currencyConverter(50, "EUR", "INR");

      expect(fakeConverter.calc).toHaveBeenCalledWith(10, "EUR", "USD");
      expect(fakeConverter.calc).toHaveBeenCalledWith(50, "EUR", "INR");
    });

    it("A spy converter is configured to fake a return value in the calc function", function() {
      fakeConverter.calc.and.callFake(function() {
        return 0;
      });

      var result = calculator.currencyConverter(50, "EUR", "INR");
      var result1 = calculator.currencyConverter(10, "USD", "INR");

      expect(result).toEqual(0);
      expect(result1).toEqual(0);
    });
  });

  describe('A currency converter', function() {
    it('should can convert Euros (EUR) to US Dollars (USD)', function() {
      var result = converter.calc(10, "EUR", "USD");

      expect(result).toEqual(11.23);
    });

    it('should can convert Euros (EUR) to Indian Rupee (INR)', function() {
      var result = converter.calc(50, "EUR", "INR");

      expect(result).toEqual(3699.82);
    });

    it('should not can convert incorrect input Euros (EURS) to Indian Rupee (INR)', function() {
      var result = converter.calc(50, "EURS", "INR");
      expect(result).toBeNaN();
    });
  });
})();