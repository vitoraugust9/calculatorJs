const previousOperationText = document.querySelector(".previous-operation");
const currentOperationText = document.querySelector(".displayed");
const buttons = document.querySelectorAll(".section-buttons button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  highlightOperatorButton(operator) {
    buttons.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.innerText === operator) {
        btn.classList.add("active");
      }
    });
  }
  // add digit to calculator screen
  addDigit(digit) {
  // Verificar se o comprimento atual excede 9 caracteres
  if (this.currentOperationText.innerText.length >= 9) {
    return; // Retorna se o limite for atingido
  }

  if (digit === "." && this.currentOperationText.innerText.includes(".")) {
    return;
  }

  this.currentOperation = digit; // Adicionar o dígito ao texto atual
  this.updateScreen(); // Atualizar o visor
}


  // process all calculator operations
  processOperation(operation) {
  // Check if current value is empty
  if (this.currentOperationText.innerText === "" && operation !== "C") {
    // Change operation
    if (this.previousOperationText.innerText !== "") {
      this.changeOperation(operation);
    }
    return;
  }

  // Get current and previous values
  let operationValue;
  let previous = +this.previousOperationText.innerText.split(" ")[0];
  let current = +this.currentOperationText.innerText;

  switch (operation) {
    case "+":
      operationValue = previous + current;
      this.updateScreen(operationValue, operation, current, previous);
      break;
    case "-":
      operationValue = previous - current;
      this.updateScreen(operationValue, operation, current, previous);
      break;
    case "*":
      operationValue = previous * current;
      this.updateScreen(operationValue, operation, current, previous);
      break;
    case "/":
      operationValue = previous / current;
      this.updateScreen(operationValue, operation, current, previous);
      break;
      case "%":
        operationValue = current / 100;
        this.currentOperationText.innerText = operationValue;

        break;
    case "DEL":
      this.processDelOperator();
      break;
    case "AC":
      this.processClearCurrentOperator();
      break;
    case "C":
      this.processClearOperator();
      break;
    case "=":
      this.processEqualOperator();
      break;
    default:
      return;
  }
}

  // Change values of calculator screen
  updateScreen(
    operationValue = "",
    operation = "",
    current = "",
    previous = ""
  ) {
    // Verificar se algum parâmetro é null ou NaN
    if (
      operationValue === null ||
      isNaN(operationValue) ||
      operation === null ||
      current === null ||
      previous === null ||
      isNaN(current) ||
      isNaN(previous)
    ) {
      // Se qualquer parâmetro for null ou NaN, não faça nada
      return;
    }
  
    if (operationValue === "") {
      // Append number to current value
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // Check if value is zero, if it is, just add the current value
      if (previous === 0) {
        operationValue = current;
      }
  
      // Adiciona o resultado imediatamente para o operador %
      if (operation === "%" && operationValue !== null) {
        this.currentOperationText.innerText =
          operationValue !== null ? operationValue : "";
      } else {
        // Add current value to previous
        this.previousOperationText.innerText =
          operationValue !== "" ? `${operationValue} ${operation}` : "";
        this.currentOperationText.innerText =
          operationValue !== "" ? "" : this.currentOperationText.innerText;
      }
    }
  }

  // Change math operation
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/", "%"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }


  // Clear current operation
  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }

  // Clear all operations
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  processEqualOperator() {
    let operationText = this.previousOperationText.innerText;
    let operation = "";

    if (operationText.includes(" ")) {
        operation = operationText.split(" ")[1];
    }

    if (["+", "-", "*", "/"].includes(operation)) {
        this.processOperation(operation);
        this.currentOperationText.innerText = this.previousOperationText.innerText.split(" ")[0];
        this.previousOperationText.innerText = ""; // Limpa a classe .previous-operation
    }
}
}

const calc = new Calculator(previousOperationText, currentOperationText);




function toggleButton() {
  const stopOperationButton = document.querySelector('.stop-operation');
  const clearDisplayButton = document.querySelector('.clear-display');

  const isPreviousEmpty = calc.previousOperationText.innerText === '';
  const isCurrentEmpty = calc.currentOperationText.innerText === '';

  if (isPreviousEmpty && isCurrentEmpty) {
    stopOperationButton.style.display = 'block';
    clearDisplayButton.style.display = 'none';
  } else {
    stopOperationButton.style.display = 'none';
    clearDisplayButton.style.display = 'block';
  }
}

// Event listener loop
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    // Remove the 'active' class from all buttons before highlighting the operator button
    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });

    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else if (value === "%") {
      // Perform the operation for the "%" button
      calc.processOperation(value);

      // Remove the 'active' class from the "%" button
      btn.classList.remove("active");
    } else {
      // Perform the operation for other operators
      calc.processOperation(value);

      // Add the 'active' class to the operator button
      calc.highlightOperatorButton(value);
    }

    // Call toggleButton after processing the button click
    toggleButton();
  });
});