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
    operator.addEventListener("click", () =>
      operate(operator.textContent.trim())
    )
  );

  function operate(operator) {
    if (firstNumber && secondNumber) {
      calculate();
    }
    displayOperator(operator);
    setBinaryOperator(operator);
  }

  equals.addEventListener("click", calculate);

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
    if (!firstNumber || !binaryOperator || !secondNumber) return;
    x = +firstNumber;
    y = +secondNumber;
    switch (binaryOperator) {
      case "+":
        showResultOnScreen(add(x, y));
        break;
      case "-":
        showResultOnScreen(subtract(x, y));
        break;
      case "x":
        showResultOnScreen(multiply(x, y));
        break;
      case "/":
        showResultOnScreen(divide(x, y));
        break;
    }
  }

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
    console.log(secondNumber);
  }

  function setNumber(number) {
    if (!binaryOperator) {
      appendFirstNumber(number);
    } else {
      appendSecondNumber(number);
    }
    displayNumber(number);
  }

  function showResultOnScreen(result) {
    setDisplay(result);
    setFirstNumber(result);
    setSecondNumber("");
    setBinaryOperator("");
  }

  function displayNumber(number) {
    if (getDisplay() === "0") setDisplay("");
    appendDisplay(number);
  }

  function isLastCharacterOperator() {
    operatorsArray = [...operators];
    operatorsArray.some((operator) => operator === getDisplay().slice(-1));
  }

  function displayOperator(operator) {
    if (getDisplay() === "0" || isLastCharacterOperator()) return;
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
    setFirstNumber("");
    setSecondNUmber("");
    setBinaryOperator("");
  }

  function undoLastCharacter() {
    setDisplay(screenOutput.textContent.slice(0, -1));
    if (getDisplay() === "") setDisplay("0");
  }
})();
