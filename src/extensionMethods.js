import { Vector2 } from "./vector2.js";

Array.prototype.remove = function (element) {
    const index = this.indexOf(element);
    if (index !== -1) this.splice(index, 1);
    else return false;
    return true;
};

Array.prototype.random = function () {
    const index = Math.floor(Math.random() * this.length);
    return this[index];
};

HTMLElement.prototype.applyOptions = function (options) {
    if (typeof options !== "object") throw new Error("OPTIONS MUST BE AN OBJECT");
    Object.entries(options).forEach(kvp => {
        if (this[kvp[0]] instanceof DOMTokenList) this[kvp[0]].add(kvp[1]);
        else this[kvp[0]] = kvp[1];
    });
};

HTMLElement.prototype.getRectSize = function () {
    const rect = this.getBoundingClientRect();
    return new Vector2(rect.width, rect.height);
};

HTMLElement.prototype.overlaps = function (otherElement, allowedPixelOverlap = 0) {
    const rectangle1 = this.getBoundingClientRect();
    const rectangle2 = otherElement.getBoundingClientRect();
    if (rectangle1.right < rectangle2.left + allowedPixelOverlap || rectangle2.right < rectangle1.left + allowedPixelOverlap)
        return false;
    if (rectangle1.bottom < rectangle2.top + allowedPixelOverlap || rectangle2.bottom < rectangle1.top + allowedPixelOverlap)
        return false;
    return true;
};
