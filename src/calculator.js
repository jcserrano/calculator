function calc(num1, num2, op) {
  switch(op) {
    case "+":
      return Number(num1) + Number(num2);
      break;
    case "-":
      return Number(num1) - Number(num2);
      break;
    case "*":
      return  Number(num1) * Number(num2);
    case "/":
      return Number(num1) / Number(num2);
      break;
    default:
      return NaN
  }
}
