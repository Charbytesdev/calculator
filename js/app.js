(function () {
  let firstNumber = "";
  let binaryOperator = "";
  let secondNumber = "";

  const numbers = document.querySelectorAll(".number");
  const screenOutput = document.querySelector("#screen-output");
  const operators = document.querySelectorAll(".operator");
  const equals = document.getElementById("equals");
  const ac = document.getElementById("ac");
  const backspace = document.getElementById("backspace");

  numbers.forEach((number) =>
    number.addEventListener("click", () => setNumber(number.textContent))
  );

  operators.forEach((operator) =>
    operator.addEventListener("click", () => operate(operator.textContent))
  );

  equals.addEventListener("click", calculate);
  ac.addEventListener("click", clearScreen);
  backspace.addEventListener("click", undoLastCharacter);

  function setFirstNumber(number) {
    firstNumber = number;
  }

  function appendFirstNumber(number) {
    firstNumber += number;
  }

  function setBinaryOperator(operator) {
    binaryOperator = operator;
  }

  function setSecondNumber(number) {
    secondNumber = number;
  }

  function appendSecondNumber(number) {
    secondNumber += number;
  }

  function displayNumber(number) {
    if (getDisplay() === "0") setDisplay("");
    appendDisplay(number);
  }

  function setNumber(number) {
    displayNumber(number);
    if (!binaryOperator) {
      appendFirstNumber(number);
    } else {
      appendSecondNumber(number);
    }
  }

  function displayOperator(operator) {
    if (getDisplay() === "0") return;
    else if (binaryOperator && getDisplay().includes(binaryOperator)) {
      setDisplay(getDisplay().replace(binaryOperator, operator));
    } else {
      appendDisplay(operator);
    }
  }

  function operate(operator) {
    if (firstNumber && secondNumber) {
      calculate();
    }
    displayOperator(operator);
    setBinaryOperator(operator);
  }

  function add(...numbers) {
    return numbers.reduce((sum, number) => sum + number);
  }

  function subtract(...numbers) {
    return numbers.reduce((difference, number) => difference - number);
  }

  function multiply(...numbers) {
    return numbers.reduce((product, number) => product * number);
  }

  function divide(...numbers) {
    return numbers.reduce((quotient, number) => quotient / number);
  }

  function displayResult(result) {
    setDisplay(result);
    setFirstNumber(result);
    setSecondNumber("");
    setBinaryOperator("");
  }

  function calculate() {
    if (!firstNumber || !binaryOperator || !secondNumber) return;
    x = +firstNumber;
    y = +secondNumber;
    switch (binaryOperator.trim()) {
      case "+":
        displayResult(add(x, y));
        break;
      case "-":
        displayResult(subtract(x, y));
        break;
      case "x":
        displayResult(multiply(x, y));
        break;
      case "/":
        displayResult(divide(x, y));
        break;
    }
  }

  function getDisplay() {
    return screenOutput.textContent;
  }

  function setDisplay(content) {
    screenOutput.textContent = content;
  }

  function appendDisplay(content) {
    screenOutput.textContent += content;
  }

  function undoLastCharacter() {
    setDisplay(getDisplay().slice(0, -1));
    if (getDisplay() === "") setDisplay("0");
  }

  function clearScreen() {
    setDisplay("0");
    setFirstNumber("");
    setSecondNumber("");
    setBinaryOperator("");
  }
})();
