let defaultTheme = window.matchMedia("(prefers-color-scheme: dark)");
let imgTheme = document.getElementById("theme");

if (defaultTheme.matches) {
  imgTheme.src = "./public/light.svg";
  setDarkTheme();
  updateImagePath("light");
} else {
  imgTheme.src = "./public/dark.svg";
  setLightTheme();
  updateImagePath("dark");
}

function toggleTheme() {
  if (imgTheme.src.endsWith("/light.svg")) {
    imgTheme.src = "./public/dark.svg";
    setLightTheme();
    updateImagePath("dark");
  } else {
    imgTheme.src = "./public/light.svg";
    setDarkTheme();
    updateImagePath("light");
  }
}

defaultTheme.addEventListener("change", (e) => {
  if (e.matches) {
    imgTheme.src = "./public/light.svg";
    setLightTheme();
    updateImagePath("light");
  } else {
    imgTheme.src = "./public/dark.svg";
    setDarkTheme();
    updateImagePath("dark");
  }
});

function updateImagePath(theme) {
  const operatorImages = document.querySelectorAll(".image-operator");
  operatorImages.forEach(image => {
    const imageName = image.src.split("/").pop(); // Get the image name
    const isDarkImage = imageName.endsWith("-dark.svg");

    if ((theme === "light" && isDarkImage) || (theme === "dark" && !isDarkImage)) {
      return; // Imagem já corresponde ao tema, não há necessidade de alterar
    }
    
    const imagePath = isDarkImage ? imageName.replace("-dark.svg", ".svg") : imageName.replace(".svg", "-dark.svg");
    image.src = `./public/${imagePath}`;
  });
}


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
  document.documentElement.style.setProperty('--operator-active', '#cfcfcf')

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
  document.documentElement.style.setProperty('--operator-active', "#1a1c1f")
}

