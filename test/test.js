(function () {
  'use strict';

  var sinon = require("sinon");
  var converter = require('../src/converter.js');
  var calculator = require('../src/calculator.js');

  QUnit.module('A simple calculator');
  QUnit.test('can add positive integers', function(assert) {
    assert.equal(calculator.add(3,1), 4);
  });
  QUnit.test('can subtract positive integers', function(assert) {
    assert.equal(calculator.sub(8,5), 3);
  });
  QUnit.test('can multiply positive integers', function(assert) {
    assert.equal(calculator.mult(4,3), 12);
  });
  QUnit.test('can divide positive integers', function(assert) {
    assert.equal(calculator.div(12,4), 3);
  });

  QUnit.module( "A calculator with currency converter", {
    beforeEach: function() {
      this.fakeConverter = { calc: function () { } },
      this.mockConverter = sinon.mock(this.fakeConverter);
      calculator.addConverter(this.fakeConverter);
    }
  });
  QUnit.test('A mock converter calls one time the calc function', function() {
    var expectation = this.mockConverter.expects('calc').once();
    calculator.currencyConverter(50, "EUR", "INR");

    ok(expectation.verify());
  });
  QUnit.test('A mock converter tracks all the arguments in the calc function', function() {
    var expectation1 = this.mockConverter.expects('calc').withExactArgs(10, "EUR", "USD");
    var expectation2 = this.mockConverter.expects('calc').withExactArgs(50, "EUR", "INR");
    calculator.currencyConverter(10, "EUR", "USD");
    calculator.currencyConverter(50, "EUR", "INR");

    ok(expectation1.verify());
    ok(expectation2.verify());
  });
  QUnit.test('A mock converter is configured to fake a return value in the calc function', function() {
    var expectation1 = this.mockConverter.expects('calc').once().returns(0);
    var expectation2 = this.mockConverter.expects('calc').once().returns(34);

    var result1 = calculator.currencyConverter(50, "EUR", "INR");
    var result2 = calculator.currencyConverter(10, "USD", "INR");

    ok(expectation1.verify(0));
    ok(expectation2.verify(34));
  });

  QUnit.module('A currency converter');
  QUnit.test('should can convert Euros (EUR) to US Dollars (USD)', function(assert) {
    var result = converter.calc(10, "EUR", "USD");

    assert.equal(result, 11.23);
  });
  QUnit.test('should can convert Euros (EUR) to Indian Rupee (INR)', function(assert) {
    var result = converter.calc(50, "EUR", "INR");

    assert.equal(result, 3699.82);
  });
  QUnit.test('should can convert US Dollars (USD) to Euros (EUR) with inverse range', function(assert) {
    var result = converter.calc(50, "USD", "EUR");

    assert.equal(result, 44.52);
  });
  QUnit.test('should not can convert incorrect input Euros (EURS) to Indian Rupee (INR)', function(assert) {
    var result = converter.calc(50, "EURS", "INR");

    assert.equal(result, 0);
  });
})();