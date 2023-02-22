import Canvas from "./js/dimensions.js";

// setup canvas
const canvas = new Canvas();

const sizeDisplay = document.querySelector("span[title='dimension-display']");
const sizeSlider = document.querySelector("input[title='dimension-slider']");

sizeSlider.addEventListener("change", (event) => {
    const number = event.target.value;
    canvas.setDimension(number);
    sizeDisplay.textContent = `${number} x ${number}`
});

const drawColorDisplay = document.querySelector("span[title='draw-color-display']");
const drawColorSelector = document.querySelector("input[title='draw-color-selector']");

drawColorSelector.addEventListener("change", (event) => {
    const hex = event.target.value;
    canvas.setColor(hex);
    drawColorDisplay.textContent = `${hex}`
});
