(function () {
  const numbers = document.querySelectorAll(".number");
  const screenOutput = document.querySelector("#screen-output");
  const ac = document.getElementById("ac");

  let firstNumber = NaN;
  let secondNumber = NaN;
  let operator = null;

  numbers.forEach((number) =>
    number.addEventListener("click", () => showOnScreen(number.textContent))
  );

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

  function showOnScreen(output) {
    if (screenOutput.textContent === "0") screenOutput.textContent = "";
    screenOutput.textContent += output;
  }

  function clearScreen() {
    screenOutput.textContent = "0";
  }
})();
