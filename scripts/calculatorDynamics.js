const previousOperationText = document.querySelector(".previous-operation");
const currentOperationText = document.querySelector(".displayed");
const buttons = document.querySelectorAll(".section-buttons button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  addDigit(digit) {
    if (this.currentOperation.length < 11) {
      if (digit === "." && this.currentOperationText.innerText.includes(".")) {
        return;
      }
      this.currentOperation += digit;
      this.updateScreen();
    }
  }

  processOperation(operation) {
    let operationValue;
    let previous = +this.previousOperationText.innerText;
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;

      default:
        return;
    }
  }

  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    console.log(operationValue, operation, current, previous);
    if (operationValue === null) {
      this.currentOperationText.innerText = this.currentOperation;
    } else {
      if (previous === 0) {
        operationValue = current;
      }
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = ""
    }
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      // Se for um botão de número ou ponto decimal
      calc.addDigit(value);
    } else if (value !== "AC" || value !== "C" || value !== "toggle") {
      calc.processOperation(value);
    }
  });
});

function calculateResult(previous, current) {
  try {
    return eval(previous + current);
  } catch (error) {
    return "Erro na expressão";
  }
}

function toggleButton() {
  const stopOperationButton = document.querySelector(".stop-operation");
  const clearDisplayButton = document.querySelector(".clear-display");

  if (
    stopOperationButton.style.display === "" ||
    stopOperationButton.style.display === "block"
  ) {
    stopOperationButton.style.display = "none";
    clearDisplayButton.style.display = "block";
  } else {
    stopOperationButton.style.display = "block";
    clearDisplayButton.style.display = "none";
  }
}
