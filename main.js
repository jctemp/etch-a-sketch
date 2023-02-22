const canvas = document.querySelector("section[title='canvas']");
for (let index = 0; index < 256; index++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.setAttribute("title", "");
    canvas.appendChild(pixel);
}