(function () {
  let firstNumber = "";
  let binaryOperator = "";
  let secondNumber = "";

  const display = document.querySelector("#screen-output");
  const displayTmp = document.querySelector("#screen-tmp");
  const numbers = document.querySelectorAll(".number");
  const operators = document.querySelectorAll(".operator");
  const equals = document.getElementById("equals");
  const ac = document.getElementById("ac");
  const backspace = document.getElementById("backspace");
  const decimalPoint = document.getElementById("decimal-point");
  numbers.forEach((number) =>
    number.addEventListener("click", () => setNumber(number.textContent))
  );

  operators.forEach((operator) =>
    operator.addEventListener("click", () =>
      operate(operator.textContent.trim())
    )
  );

  equals.addEventListener("click", () =>
    displayResult(calculate(), getDisplay())
  );
  ac.addEventListener("click", clearScreen);
  backspace.addEventListener("click", undoLastCharacter);
  decimalPoint.addEventListener("click", setDecimalPoint);

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

  function setDecimalPoint() {
    handleErrors();
    if (firstNumber.includes(".") && secondNumber.includes(".")) {
      return;
    } else if (!firstNumber.includes(".") && !binaryOperator) {
      appendFirstNumber(".");
      if (getDisplay() === "0") {
        setDisplay("0.");
        setDisplayTmp("0.");
        firstNumber = "0.";
      } else {
        appendDisplay(".");
        appendDisplayTmp(".");
      }
    } else if (!secondNumber.includes(".") && binaryOperator) {
      appendSecondNumber(".");
      appendDisplay(".");
    }
  }

  function displayNumber(number) {
    if (getDisplay() === "0") {
      setDisplay("");
      setDisplayTmp("");
    }
    if (secondNumber === "0") {
      secondNumber = "";
      setDisplay(getDisplay().slice(0, -1));
    }
    appendDisplay(number);
    appendDisplayTmp(number);
  }

  function setNumber(number) {
    handleErrors();

    displayNumber(number);
    if (!binaryOperator) {
      appendFirstNumber(number);
    } else {
      appendSecondNumber(number);
      displayResult(calculate(), getDisplayTmp());
    }
  }

  function displayOperator(operator) {
    if (getDisplay() === "0") {
      setFirstNumber("0");
    }
    if (binaryOperator && getDisplay().includes(binaryOperator)) {
      setDisplay(getDisplay().replace(binaryOperator, operator));
    } else {
      appendDisplay(operator);
    }
  }

  function operate(operator) {
    handleErrors();
    if (firstNumber && secondNumber) {
      displayResult(calculate(), getDisplay());
    }
    displayOperator(operator);
    setBinaryOperator(operator);
  }

  function add(x, y) {
    return x + y;
  }

  function subtract(x, y) {
    return x - y;
  }

  function multiply(x, y) {
    return x * y;
  }

  function divide(x, y) {
    if (y === 0) {
      setDisplay("ERROR!");
      setDisplayTmp("ERROR!");
      return "ERROR";
    }
    return x / y;
  }

  function modulo(x, y) {
    return x % y;
  }

  function power() {
    return Math.pow(x, y);
  }

  function displayResult(result, display) {
    if (result === "ERROR!") {
      return;
    }
    result = parseFloat(result.toFixed(2)).toString();
    if (display === getDisplay()) {
      setDisplay(result);
      setFirstNumber(result);
      setSecondNumber("");
      setBinaryOperator("");
    } else if (display === getDisplayTmp()) {
      setDisplayTmp(result);
    }
  }

  function calculate() {
    if (!firstNumber || !binaryOperator || !secondNumber) return;
    if (secondNumber === ".") return;
    x = +firstNumber;
    y = +secondNumber;

    switch (binaryOperator.trim()) {
      case "+":
        return add(x, y);
      case "-":
        return subtract(x, y);
      case "x":
        return multiply(x, y);
      case "/":
        return divide(x, y);
      case "%":
        return modulo(x, y);
      case "^":
        return power(x, y);
    }
  }

  function getDisplay() {
    return display.textContent;
  }

  function setDisplay(content) {
    display.textContent = content;
  }

  function appendDisplay(content) {
    display.textContent += content;
  }

  function getDisplayTmp() {
    return displayTmp.textContent;
  }

  function setDisplayTmp(content) {
    displayTmp.textContent = content;
  }

  function appendDisplayTmp(content) {
    displayTmp.textContent += content;
  }

  function undoLastCharacter() {
    let lastCharacter = getDisplay().slice(-1);
    setDisplay(getDisplay().slice(0, -1));
    if (isNaN(lastCharacter) && lastCharacter != ".") {
      binaryOperator = "";
    } else if (!secondNumber) {
      firstNumber = firstNumber.slice(0, -1);
      setDisplayTmp(getDisplay());
    } else if (secondNumber) {
      secondNumber = secondNumber.slice(0, -1);
      if (secondNumber) {
        displayResult(calculate(), getDisplayTmp());
      } else {
        setDisplayTmp(firstNumber);
      }
    }
    if (getDisplay() === "") {
      setDisplay("0");
      setDisplayTmp("-");
    }
  }
  function clearScreen() {
    setDisplay("0");
    setDisplayTmp("-");
    setFirstNumber("");
    setSecondNumber("");
    setBinaryOperator("");
  }

  function handleErrors() {
    if (getDisplay() === "ERROR!") clearScreen();
  }

  //Audio
  let isMuted = false;

  const body = document.querySelector("body");
  const backgroundMusic = document.querySelector("#background-music");
  const buttonClickAudio = document.querySelector("#button-click-audio");
  const allButtons = document.querySelectorAll("button");
  const soundButton = document.querySelector("#sound-button");

  body.addEventListener("click", playBackgroundMusic);
  allButtons.forEach((button) =>
    button.addEventListener("click", () => playSoundEffect(buttonClickAudio))
  );

  soundButton.addEventListener("click", changeAudioState);

  function playBackgroundMusic() {
    if (!isMuted) {
      backgroundMusic.volume = 0.1;
      backgroundMusic.play();
    }
  }

  function pauseBackgroundMusic() {
    backgroundMusic.pause();
  }

  function playSoundEffect(audio) {
    audio.currentTime = 0;
    audio.play();
  }

  function muteSoundEffect(audio) {
    audio.muted = true;
  }

  function unmuteSoundEffect(audio) {
    audio.muted = false;
  }

  function changeSoundImage(soundImage) {
    if (soundImage.src.includes("/unmuted.png")) {
      soundImage.src = soundImage.src.replace("/unmuted", "/muted");
    } else {
      soundImage.src = soundImage.src.replace("/muted", "/unmuted");
    }
  }

  function changeAudioState() {
    if (!isMuted) {
      isMuted = true;
      pauseBackgroundMusic();
      muteSoundEffect(buttonClickAudio);
    } else {
      isMuted = false;
      backgroundMusic.play();
      unmuteSoundEffect(buttonClickAudio);
    }
    changeSoundImage(soundButton);
  }
})();
