const startBtnEl = document.querySelector(".startBtn");
const imgInpEl = document.querySelector(".imgInput");
const imgEl = document.querySelector(".imgEl");

const edResultEl = document.querySelector(".edResult");
const finalResultEl = document.querySelector(".finalResult");
const eyeDropper = new EyeDropper();
import colors from "./colors.js";

imgInpEl.onchange = (evt) => {
  const [file] = imgInpEl.files;
  if (file) {
    imgEl.src = URL.createObjectURL(file);
  }
};

let currentEdColor;
let currentFinalColor;

startBtnEl.addEventListener("click", () => {
  if (!window.EyeDropper) {
    edResultEl.textContent = "Your browser does not support the EyeDropper API";
    return;
  }
  eyeDropper
    .open()
    .then((result) => {
      currentEdColor = result.sRGBHex;
      currentFinalColor = findNearestColor(currentEdColor);
      updateOutput();
    })
    .catch((e) => {
      edResultEl.textContent = e;
    });
});

function updateOutput() {
  edResultEl.textContent = currentEdColor;
  edResultEl.style.backgroundColor = currentEdColor;
  finalResultEl.textContent = `${currentFinalColor}(${
    colors[currentFinalColor.slice(1)]
  })`;
  finalResultEl.style.backgroundColor = currentFinalColor;
}

function findNearestColor(color) {
  let currentDistance = Infinity;
  let currentColor;
  Object.keys(colors).forEach((key) => {
    let d = absoluteColorDistance(hexToRGB(key), hexToRGB(color.slice(1)));
    if (d < currentDistance) {
      currentDistance = d;
      currentColor = key;
    }
  });
  return "#" + currentColor;
}

function absoluteColorDistance(colorA, colorB) {
  return (
    Math.abs(colorA[0] - colorB[0]) +
    Math.abs(colorA[1] - colorB[1]) +
    Math.abs(colorA[2] - colorB[2])
  );
}

function hexToRGB(hexColor) {
  let r = parseInt(hexColor.slice(0, 2), 16);
  let g = parseInt(hexColor.slice(2, 4), 16);
  let b = parseInt(hexColor.slice(4), 16);
  return [r, g, b];
}

// function luminanceDistance(colorA, colorB) {
//   function luminance_f(red, green, blue) {
//     return Math.round(0.2126 * red + 0.7152 * green + 0.0722 * blue);
//   }
//   return Math.abs(
//     luminance_f(colorA[0], colorA[1], colorA[2]) -
//       luminance_f(colorB[0], colorB[1], colorB[2])
//   );
// }
