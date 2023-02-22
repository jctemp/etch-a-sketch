class Canvas {
    element = null;

    constructor() {
        this.element = document.querySelector("section[title='canvas']");
        if (!this.element)
            throw new Error("Could not find the canvas element. (section[title='canvas'])");

        this.setDimension(16);
        this.setColor("#000000");
        this.clear();
    }

    setDimension(number) {
        number = Math.max(16, Math.min(64, number));
        this.element.style["gridTemplateColumns"] = `repeat(${number}, 1fr)`;
        this.element.style["gridTemplateRows"] = `repeat(${number}, 1fr)`;

        // REFRESH ONLY NEEDED PARTS

        while (this.element.children.length > 0)
            this.element.removeChild(this.element.lastElementChild);


        for (let index = this.element.children.length; index < number * number; index++) {
            const pixel = document.createElement("div");
            pixel.classList.add("pixel");
            pixel.setAttribute("title", "");
            this.element.appendChild(pixel);

            // needed to ignore drag event
            pixel.addEventListener("dragstart", (event) => {
                event.preventDefault();
            });
        }
    }

    setColor(hex) {
        for (let index = 0; index < this.element.children.length; index++) {
            const element = this.element.children[index];

            let colorChange = (pixel) => pixel.style["backgroundColor"] = hex;

            element.addEventListener("mouseover", (event) => {
                if (event.buttons == 1) {
                    colorChange(event.target);
                }
            });

            element.addEventListener("mousedown", (event) => {
                console.log("down");
                colorChange(event.target);
            });

        }
    }

    clear() {
        for (let index = 0; index < this.element.children.length; index++) {
            this.element.children[index].setAttribute("style", "");;
        }
    }

}

export default Canvas;