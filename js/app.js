(function () {
  function add(...numbers) {
    return numbers.reduce((sum, number) => sum + number, 0);
  }

  function multiply(...numbers) {
    return numbers.reduce((product, number) => product * number, 1);
  }
})();
