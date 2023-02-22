import Canvas from "./js/dimensions.js";

// setup canvas
const canvas = new Canvas();
canvas.setDimension(16);

const sizeDisplay = document.querySelector("span[title='dimension-display']");
const sizeSlider = document.querySelector("input[title='dimension-slider']");

sizeSlider.addEventListener("change", (event) => {
    const number = event.target.value;
    canvas.setDimension(number);
    sizeDisplay.textContent = `${number} x ${number}`
});

