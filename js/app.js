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
    number.addEventListener("click", () =>
      showInputOnScreen(number.textContent)
    )
  );

  operators.forEach((operator) =>
    operator.addEventListener("click", () => {
      showInputOnScreen(operator.textContent);
      setOperator(operator.textContent);
      if (!firstNumber) setFirstNumber();
      else {
        setSecondNumber();
      }
    })
  );

  equals.addEventListener("click", setSecondNumber);

  ac.addEventListener("click", clearScreen);
  backspace.addEventListener("click", UndoScreen);

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

  function operate(firstNumber, operator, secondNumber) {
    switch (operator) {
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
    firstNumber = screenOutput.textContent.split(binaryOperator)[0];
    console.log(firstNumber);
  }

  function setOperator(operator) {
    binaryOperator = operator;
  }

  function setSecondNumber() {
    secondNumber = screenOutput.textContent.split(binaryOperator)[1];
    operate(+firstNumber, binaryOperator.trim(), +secondNumber);
  }

  function showResultOnScreen(result) {
    screenOutput.textContent = result + binaryOperator;
    firstNumber = result;
    secondNumber = NaN;
    binaryOperator = null;
  }

  function showInputOnScreen(output) {
    if (screenOutput.textContent === "0") screenOutput.textContent = "";
    screenOutput.textContent += output;
  }

  function clearScreen() {
    screenOutput.textContent = "0";
    firstNumber = NaN;
    secondNumber = NaN;
    binaryOperator = null;
  }

  function UndoScreen() {
    screenOutput.textContent = screenOutput.textContent.slice(0, -1);
    if (screenOutput.textContent === "") screenOutput.textContent = 0;
  }
})();
