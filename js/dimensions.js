class Canvas {
    prevColor = "";
    currColor = "#000000";
    element = null;
    hueDegree = 0;

    constructor() {
        this.element = document.querySelector("section[title='canvas']");
        if (!this.element)
            throw new Error("Could not find the canvas element. (section[title='canvas'])");

        this.setDimension(16);
        this.setColor(this.currColor);
        this.clear();
    }

    applyToChildren(callback) { 
        for (let index = 0; index < this.element.children.length; index++) {
            const element = this.element.children[index];
            callback(element);
        }
    }

    changeColorEventListener(colorChange) {
        let over = event => {
            if (event.buttons == 1)
                colorChange(event.target);
        }

        let down = event => colorChange(event.target);

        this.applyToChildren(child => {
            child.removeEventListener("mouseover", over);
            child.removeEventListener("mousedown", down);

            child.addEventListener("mouseover", over);
            child.addEventListener("mousedown", down);
        });
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

            pixel.addEventListener("dragstart", (event) => {
                event.preventDefault();
            });
        }

        this.clear();
        this.setColor(this.currColor);
    }

    setColor(hex) {
        this.currColor = hex;
        let colorChange = (pixel) => pixel.style["backgroundColor"] = this.currColor;
        this.changeColorEventListener(colorChange);
    }

    toggleRainbow(enabled) {
        if (enabled) {
            this.hue = true;
            this.prevColor = this.currColor;

            let colorChange = (pixel) => {
                pixel.style["backgroundColor"] = "#ffff00";
                pixel.style["filter"] = `hue-rotate(${this.hueDegree}deg)`;
                this.hueDegree += 10;
            };

            this.changeColorEventListener(colorChange);
        } else {
            this.setColor(this.prevColor);
        }
    }

    clear() {
        this.applyToChildren(child => child.setAttribute("style", ""));
    }
}

export default Canvas;