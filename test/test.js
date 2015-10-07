(function () {
  'use strict';

  var assert = require("assert");
  var sinon = require("sinon");
  var converter = require('../src/converter.js');
  var calculator = require('../src/calculator.js');

  describe('A simple calculator', function() {
    it('can add positive integers', function() {
      assert.equal(calculator.add(3,1), 4);
    });

    it("can subtract positive integers", function() {
      assert.equal(calculator.sub(8,5), 3);
    });

    it("can multiply positive integers", function() {
      assert.equal(calculator.mult(4,3), 12);
    });

    it("can divide positive integers", function() {
      assert.equal(calculator.div(12,4), 3);
    });
  });

  describe('A calculator with currency converter', function() {
    var fakeConverter;
    var mockConverter;

    before(function () { 
      fakeConverter = { calc: function () { } },
      mockConverter = sinon.mock(fakeConverter);
      calculator.addConverter(fakeConverter);
    });

    it("A mock converter calls one time the calc function", function() {
      var expectation = mockConverter.expects('calc').once();
      calculator.currencyConverter(50, "EUR", "INR");

      expectation.verify();
    });

    it("A mock converter tracks all the arguments in the calc function", function() {
      var expectation1 = mockConverter.expects('calc').withExactArgs(10, "EUR", "USD");
      var expectation2 = mockConverter.expects('calc').withExactArgs(50, "EUR", "INR");
      calculator.currencyConverter(10, "EUR", "USD");
      calculator.currencyConverter(50, "EUR", "INR");

      expectation1.verify();
      expectation2.verify();
    });

    it("A mock converter is configured to fake a return value in the calc function", function() {
      var expectation1 = mockConverter.expects('calc').once().returns(0);
      var expectation2 = mockConverter.expects('calc').once().returns(34);

      var result1 = calculator.currencyConverter(50, "EUR", "INR");
      var result2 = calculator.currencyConverter(10, "USD", "INR");

      expectation1.verify(0);
      expectation2.verify(34);
    });
  });

  describe('A currency converter', function() {
    it('should can convert Euros (EUR) to US Dollars (USD)', function() {
      var result = converter.calc(10, "EUR", "USD");

      assert.equal(result, 11.23);
    });

    it('should can convert Euros (EUR) to Indian Rupee (INR)', function() {
      var result = converter.calc(50, "EUR", "INR");

      assert.equal(result, 3699.82);
    });

    it('should not can convert incorrect input Euros (EURS) to Indian Rupee (INR)', function() {
      var result = converter.calc(50, "EURS", "INR");

      assert.notEqual(result, NaN);
    });
  });
})();