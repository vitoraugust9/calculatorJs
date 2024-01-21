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

let operationNumber = "";

let lastOperationNumber = [];

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", () => {
    const clickedElement = document.activeElement;
    if (clickedElement.classList.contains("number")) { 
      operationNumber += parseInt(clickedElement.getAttribute("value"));
      const displayValue = document.querySelector(".displayed");
      displayValue.textContent = operationNumber;
    }

    if (clickedElement.classList.contains("clear-display")) {
      operationNumber = 0;
      const displayValue = document.querySelector(".displayed");
      displayValue.textContent = operationNumber;
    }

    if (clickedElement.classList.contains("stop-operation")) {
      lastOperationNumber = "";
      operationNumber[0] = [""];
      const displayValue = document.querySelector(".displayed");
      displayValue.textContent = operationNumber[0];
    }
  });
});