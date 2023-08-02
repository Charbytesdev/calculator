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
    number.addEventListener("click", () =>
      showInputOnScreen(number.textContent)
    )
  );

  operators.forEach((operator) =>
    operator.addEventListener("click", () => {
      showInputOnScreen(operator.textContent);
      setOperator(operator.textContent);
      setFirstNumber();
    })
  );

  equals.addEventListener("click", () => {
    setSecondNumber();
    operate(+firstNumber, binaryOperator.trim(), +secondNumber);
  });

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
    switch (operator.trim()) {
      case "+":
        showResultOnScreen(add(firstNumber, secondNumber));
        break;
      case "-":
        showResultOnScreen(subtract(firstNumber, secondNumber));
        break;
      case "X":
        showResultOnScreen(multiply(firstNumber, secondNumber));
        break;
      case "/":
        showResultOnScreen(divide(firstNumber, secondNumber));
        break;
    }
  }

  function setFirstNumber() {
    firstNumber = screenOutput.textContent.split(binaryOperator)[0];
  }

  function setOperator(operator) {
    binaryOperator = operator;
  }

  function setSecondNumber() {
    secondNumber = screenOutput.textContent.split(binaryOperator)[1];
  }

  function showResultOnScreen(result) {
    screenOutput.textContent = result;
  }

  function showInputOnScreen(output) {
    if (screenOutput.textContent === "0") screenOutput.textContent = "";
    screenOutput.textContent += output;
  }

  function clearScreen() {
    screenOutput.textContent = "0";
  }
})();
