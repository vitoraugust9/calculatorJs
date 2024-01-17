let defaultTheme = window.matchMedia("(prefers-color-scheme: dark)");
let imgTheme = document.getElementById("theme");

if (defaultTheme.matches) {
  imgTheme.src = "./public/light.svg";
  setDarkTheme();
} else {
  imgTheme.src = "./public/dark.svg";
  setLightTheme();
}

function toggleTheme() {
  if (imgTheme.src.endsWith("/light.svg")) {
    imgTheme.src = "./public/dark.svg";
    setLightTheme();
  } else {
    imgTheme.src = "./public/light.svg";
    setDarkTheme();
  }
}

defaultTheme.addEventListener("change", (e) => {
  if (e.matches) {
    imgTheme.src = "./public/light.svg";
    setLightTheme();
  } else {
    imgTheme.src = "./public/dark.svg";
    setDarkTheme();
  }
});










function setLightTheme() {
  document.documentElement.style.setProperty("--calculator-color", "#ffffff");
  document.documentElement.style.setProperty("--bg-color", "#E9E9E9");
  document.documentElement.style.setProperty(
    "--buttons-section-bg-color",
    "#f5f5f5"
  );
  document.documentElement.style.setProperty("--text-color", "#000");
  document.documentElement.style.setProperty("--button-color", "#e9e9e9");
  document.documentElement.style.setProperty("--toggle-color", "#e9e9e9");


  document.getElementById('minus').src = './public/minus.svg';
  document.getElementById('percent').src = './public/percent.svg';
  document.getElementById('divide').src = './public/divide.svg';
  document.getElementById('multiply').src = './public/multiply.svg';
  document.getElementById('plus').src = './public/plus.svg';

}

function setDarkTheme() {
  document.documentElement.style.setProperty("--calculator-color", "#212327");
  document.documentElement.style.setProperty(
    "--buttons-section-bg-color",
    "#27292e"
  );
  document.documentElement.style.setProperty("--bg-color", "#1E1E1E");
  document.documentElement.style.setProperty("--text-color", "#fff");
  document.documentElement.style.setProperty("--button-color", "#323438");
  document.documentElement.style.setProperty("--toggle-color", "#323438");



  document.getElementById('minus').src = './public/minus-dark.svg';
  document.getElementById('percent').src = './public/percent-dark.svg';
  document.getElementById('divide').src = './public/divide-dark.svg';
  document.getElementById('multiply').src = './public/multiply-dark.svg';
  document.getElementById('plus').src = './public/plus-dark.svg';
}


function toggleButton() {
  const stopOperationButton = document.querySelector('.stop-operation');
  const clearDisplayButton = document.querySelector('.clear-display');


  if (stopOperationButton.style.display === '' || stopOperationButton.style.display === 'block') {

    stopOperationButton.style.display = 'none';
    clearDisplayButton.style.display = 'block';
  } else {

    stopOperationButton.style.display = 'block';
    clearDisplayButton.style.display = 'none';
  }
}
