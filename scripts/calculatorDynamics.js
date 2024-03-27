const previousOperationText = document.querySelector(".previous-operation");
const currentOperationText = document.querySelector(".displayed");
const buttons = document.querySelectorAll(".section-buttons button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.clearAll();
  }

  clearAll() {
    this.currentOperation = "";
    this.previousOperation = "";
    this.operation = undefined;
    this.readyForNewInput = false;
    this.updateDisplay();
  }

  delete() {
    this.currentOperation = this.currentOperation.toString().slice(0, -1);
    this.updateDisplay();
  }

  appendNumber(number) {
    if (this.readyForNewInput) return;
    if (number === "." && this.currentOperation.includes(".")) return;
    if (this.currentOperation.length > 9) return;
    this.currentOperation = `${this.currentOperation}${number.toString()}`;
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperation === "") return;
    if (operation === "%" && this.currentOperation !== "") {
      this.computePercentage();
      return;
    }
    if (this.previousOperation !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperation = this.currentOperation;
    this.currentOperation = "";
    this.readyForNewInput = false;
    this.updateDisplay();
  }

  computePercentage() {
    const current = parseFloat(this.currentOperation);
    if (isNaN(current)) return;
    this.currentOperation = (current / 100).toString();
    this.operation = undefined;
    this.previousOperation = "";
    this.readyForNewInput = true;
    this.updateDisplay();
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperation);
    const current = parseFloat(this.currentOperation);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "%":
        computation = prev / 100;
        break;
      default:
        return;
    }
    this.currentOperation = computation;
    this.operation = undefined;
    this.previousOperation = "";
    this.readyForNewInput = true;
    this.updateDisplay();
  }

  updateDisplay() {
    this.currentOperationText.innerText = this.currentOperation;
    this.previousOperationText.innerText =
      this.previousOperation + " " + (this.operation || "");
  }
}

function toggleButton() {
  const stopOperationButton = document.querySelector(".stop-operation");
  const clearDisplayButton = document.querySelector(".clear-display");

  const isPreviousEmpty = calculator.previousOperation === "";
  const isCurrentEmpty = calculator.currentOperation === "";

  if (!isPreviousEmpty || !isCurrentEmpty) {
    stopOperationButton.style.display = "none";
    clearDisplayButton.style.display = "block";
  } else {
    stopOperationButton.style.display = "block";
    clearDisplayButton.style.display = "none";
  }
}

const calculator = new Calculator(previousOperationText, currentOperationText);

toggleButton();

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.innerText) {
      case "C":
      case "AC":
        calculator.clearAll();
        break;
      case "DEL":
        calculator.delete();
        break;
      case "=":
        calculator.compute();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
        calculator.chooseOperation(button.innerText);
        break;
      default:
        calculator.appendNumber(button.innerText);
        break;
    }

    toggleButton();
  });
});
