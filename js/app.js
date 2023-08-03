(function () {
  let firstNumber = NaN;
  let binaryOperator = null;
  let secondNumber = NaN;

  const numbers = document.querySelectorAll(".number");
  const screenOutput = document.querySelector("#screen-output");
  const operators = document.querySelectorAll(".operator");
  const equals = document.getElementById("equals");
  const ac = document.getElementById("ac");
  const backspace = document.getElementById("backspace");

  numbers.forEach((number) =>
    number.addEventListener("click", () => displayNumber(number.textContent))
  );

  operators.forEach((operator) =>
    operator.addEventListener("click", () =>
      operate(operator.textContent.trim())
    )
  );

  function operate(operator) {
    if (!firstNumber) {
      setFirstNumber(operator);
    } else {
      setSecondNumber(binaryOperator);
      calculate(+firstNumber, binaryOperator, +secondNumber);
    }
    displayOperator(operator);
    setBinaryOperator(operator);
  }

  equals.addEventListener("click", () => {
    setSecondNumber(binaryOperator);
    calculate();
    firstNumber = null;
  });

  ac.addEventListener("click", clearScreen);
  backspace.addEventListener("click", undoLastCharacter);

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

  function calculate() {
    firstNumber = +firstNumber;
    secondNumber = +secondNumber;
    switch (binaryOperator) {
      case "+":
        showResultOnScreen(add(firstNumber, secondNumber));
        break;
      case "-":
        showResultOnScreen(subtract(firstNumber, secondNumber));
        break;
      case "x":
        showResultOnScreen(multiply(firstNumber, secondNumber));
        break;
      case "/":
        showResultOnScreen(divide(firstNumber, secondNumber));
        break;
    }
  }

  function setFirstNumber() {
    firstNumber = screenOutput.textContent;
    console.log(firstNumber);
  }

  function setBinaryOperator(operator) {
    binaryOperator = operator;
  }

  function setSecondNumber(operator) {
    secondNumber = getDisplay().split(operator)[1];
    console.log(secondNumber);
  }

  function showResultOnScreen(result) {
    setDisplay(result);
    firstNumber = result;
    secondNumber = NaN;
    binaryOperator = null;
  }

  function displayNumber(number) {
    if (getDisplay() === "0") setDisplay("");
    appendDisplay(number);
  }

  function displayOperator(operator) {
    if (getDisplay() === "0") return;
    appendDisplay(operator);
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

  function clearScreen() {
    setDisplay("0");
    firstNumber = NaN;
    secondNumber = NaN;
    binaryOperator = null;
  }

  function undoLastCharacter() {
    setDisplay(screenOutput.textContent.slice(0, -1));
    if (getDisplay() === "") setDisplay("0");
  }
})();
