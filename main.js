
const canvas = document.querySelector("section[title='canvas']");
for (let index = 0; index < 256; index++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.setAttribute("title", "");
    canvas.appendChild(pixel);


    let change = () => pixel.style["backgroundColor"] = "#eb5e28";

    pixel.addEventListener("mouseover", (event) => {
        if (event.buttons == 1) {
            change();
        }
    });

    pixel.addEventListener("mousedown", (event) => {
        change();
    })
}