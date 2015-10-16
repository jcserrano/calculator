var assert = require("assert");
var sinon = require("sinon");
var converter = require('../src/converter.js');
var calculator = require('../src/calculator.js');
var chai = require('chai');
var expect = chai.expect;

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
  var expected = 100;

  before(function () { 
    sinon.stub(converter, 'calc', function() { return expected;});
  });

  after(function () { 
    converter.calc.restore();
  });

  it("A mock converter calls one time the calc function", function() {
    var result = calculator.currencyConverter(50, "EUR", "INR");

    expect(result).to.equal(expected);
    sinon.assert.calledOnce(converter.calc);
  });

  it("A mock converter tracks all the arguments in the calc function", function() {
    var result1 = calculator.currencyConverter(10, "EUR", "USD");
    var result2 = calculator.currencyConverter(50, "EUR", "INR");

    expect(result1).to.equal(expected);
    expect(result2).to.equal(expected);

    sinon.assert.calledWith(converter.calc, 10, "EUR", "USD");
    sinon.assert.calledWith(converter.calc, 50, "EUR", "INR");
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

  it('should can convert US Dollars (USD) to Euros (EUR) with inverse range', function() {
    var result = converter.calc(50, "USD", "EUR");

    assert.equal(result, 44.52);
  });

  it('should not can convert incorrect input Euros (EURS) to Indian Rupee (INR)', function() {
    var result = converter.calc(50, "EURS", "INR");

    assert.equal(result, 0);
  });
});
