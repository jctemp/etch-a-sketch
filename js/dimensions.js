class Canvas {
    color = "#000000";
    element = null;

    constructor() {
        this.element = document.querySelector("section[title='canvas']");
        if (!this.element)
            throw new Error("Could not find the canvas element. (section[title='canvas'])");

        this.setDimension(16);
        this.setColor(this.color);
        this.clear();
    }

    applyToChildren(callback) {
        for (let index = 0; index < this.element.children.length; index++) {
            const element = this.element.children[index];
            callback(element);
        }
    }

    setDimension(number) {
        number = Math.max(16, Math.min(64, number));
        this.element.style["gridTemplateColumns"] = `repeat(${number}, 1fr)`;
        this.element.style["gridTemplateRows"] = `repeat(${number}, 1fr)`;
        const total = number * number;

        while (this.element.children.length > total)
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

        this.clear();
        this.setColor(this.color);
    }

    setColor(hex) {
        this.color = hex;
        this.applyToChildren(child => {
            let colorChange = (pixel) => pixel.style["backgroundColor"] = this.color;

            child.addEventListener("mouseover", (event) => {
                if (event.buttons == 1) {
                    colorChange(event.target);
                }
            });

            child.addEventListener("mousedown", (event) => {
                console.log("down");
                colorChange(event.target);
            });
        })
    }

    clear() {
        this.applyToChildren(child => child.setAttribute("style", ""));
    }

}

export default Canvas;