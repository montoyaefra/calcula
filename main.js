function clear() {
    current = "";
    previous = "";
    operation = undefined;
  }
  
  function deleteNumber() {
    current = current.toString().slice(0, -1);
  }
  
  function appendNumber(number) {
    if (number === "." && current.includes(".")) return;
    current = current.toString() + number.toString();
  }
  
  function chooseOperation(selectedOperation) {
    if (current === "") return;
    if (previous !== "") {
      compute();
    }
    operation = selectedOperation;
    previous = current;
    current = "";
  }
  
  function compute() {
    let computation;
    const prev = parseFloat(previous);
    const currentNum = parseFloat(current);
    if (isNaN(prev) || isNaN(currentNum)) return;
  
    switch (operation) {
      case "+":
        computation = prev + currentNum;
        break;
      case "-":
        computation = prev - currentNum;
        break;
      case "*":
        computation = prev * currentNum;
        break;
      case "÷":
        computation = prev / currentNum;
        break;
      default:
        return;
    }
  
    current = computation.toString();
    operation = undefined;
    previous = "";
  }
  
  function getDisplayNumber(number) {
    const decimalDigits = 2;
    const roundedNumber = Number(
      Math.round(`${number}e${decimalDigits}`) + `e-${decimalDigits}`
    );
    if (isNaN(roundedNumber)) {
      return "";
    }
    const str = roundedNumber.toLocaleString("en");
    return str;
  }
  
  function updateDisplay() {
    currentTextElement.innerText = getDisplayNumber(current);
    if (operation != null) {
      previousTextElement.innerText = `${getDisplayNumber(previous)} ${operation}`;
    } else {
      previousTextElement.innerText = "";
    }
  }
  
  const numberButtons = document.querySelectorAll("[data-number]");
  const operationButtons = document.querySelectorAll("[data-operation]");
  const equalsButton = document.querySelector("[data-equals]");
  const deleteButton = document.querySelector("[data-delete]");
  const clearButton = document.querySelector("[data-clear]");
  const previousTextElement = document.querySelector("[data-previous]");
  const currentTextElement = document.querySelector("[data-current]");
  
  let current = "";
  let previous = "";
  let operation = undefined;
  
  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      appendNumber(button.innerText);
      updateDisplay();
    });
  });
  
  operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      chooseOperation(button.innerText);
      updateDisplay();
    });
  });
  
  equalsButton.addEventListener("click", (button) => {
    compute();
    updateDisplay();
  });
  
  clearButton.addEventListener("click", (button) => {
    clear();
    updateDisplay();
  });
  
  deleteButton.addEventListener("click", (button) => {
    deleteNumber();
    updateDisplay();
  });
  
  updateDisplay();
  