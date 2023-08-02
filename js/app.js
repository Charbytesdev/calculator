(function () {
  let firstNumber = NaN;
  let binaryOperator = null;
  let secondNumber = NaN;

  const numbers = document.querySelectorAll(".number");
  const screenOutput = document.querySelector("#screen-output");
  const operators = document.querySelectorAll(".operator");
  const equals = document.getElementById("equals");

  const ac = document.getElementById("ac");

  numbers.forEach((number) =>
    number.addEventListener("click", () => showOnScreen(number.textContent))
  );

  operators.forEach((operator) =>
    operator.addEventListener("click", () => {
      showOnScreen(operator.textContent);
      setOperator(operator.textContent);
      setFirstNumber();
    })
  );

  equals.addEventListener("click", setSecondNumber);

  ac.addEventListener("click", clearScreen);

  function add(...numbers) {
    return numbers.reduce((sum, number) => sum + number, 0);
  }

  function subtract(...numbers) {
    return numbers.reduce((difference, number) => difference - number);
  }

  function multiply(...numbers) {
    return numbers.reduce((product, number) => product * number, 1);
  }

  function divide(...numbers) {
    return numbers.reduce((quotient, number) => quotient / number);
  }

  function operate(firstNumber, operator, secondNumber) {
    switch (operator) {
      case "+":
        return add(firstNumber, secondNumber);
      case "-":
        return subtract(firstNumber, secondNumber);
      case "*":
        return multiply(firstNumber, secondNumber);
      case "/":
        return divide(firstNumber, secondNumber);
    }
  }

  function setFirstNumber() {
    firstNumber = screenOutput.textContent.split(binaryOperator)[0];
    console.log(firstNumber);
  }

  function setOperator(operator) {
    binaryOperator = operator;
    console.log(binaryOperator);
  }

  function setSecondNumber() {
    secondNumber = screenOutput.textContent.split(binaryOperator)[1];
    console.log(secondNumber);
  }

  function showOnScreen(output) {
    if (screenOutput.textContent === "0") screenOutput.textContent = "";
    screenOutput.textContent += output;
  }

  function clearScreen() {
    screenOutput.textContent = "0";
  }
})();
