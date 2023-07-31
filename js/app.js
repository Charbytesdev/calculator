(function () {
  function add(...numbers) {
    return numbers.reduce((sum, number) => sum + number, 0);
  }

  function subtract(...numbers) {
    return numbers.reduce((difference, number) => difference - number);
  }

  function multiply(...numbers) {
    return numbers.reduce((product, number) => product * number, 1);
  }
})();
