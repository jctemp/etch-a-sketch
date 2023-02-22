class Canvas {
    element = null;

    constructor() {
        this.element = document.querySelector("section[title='canvas']");
        if (!this.element)
            throw new Error("Could not find the canvas element. (section[title='canvas'])");
    }

    setDimension(number) {
        number = Math.max(16, Math.min(64, number));
        this.element.style["gridTemplateColumns"] = `repeat(${number}, 1fr)`;
        this.element.style["gridTemplateRows"] = `repeat(${number}, 1fr)`;

        while (this.element.children.length > 0)
            this.element.removeChild(this.element.lastElementChild);

        let colorChange = (pixel) => pixel.style["backgroundColor"] = "#000000";

        for (let index = this.element.children.length; index < number * number; index++) {
            const pixel = document.createElement("div");
            pixel.classList.add("pixel");
            pixel.setAttribute("title", "");
            this.element.appendChild(pixel);

            pixel.addEventListener("mouseover", (event) => {
                if (event.buttons == 1) {
                    colorChange(event.target);
                }
            });

            pixel.addEventListener("mousedown", (event) => {
                console.log("down");
                colorChange(event.target);
            });

            // needed to ignore drag event
            pixel.addEventListener("dragstart", (event) => {
                event.preventDefault();
            });
        }
    }

    clear() {
        // TODO;
    }

}

export default Canvas;