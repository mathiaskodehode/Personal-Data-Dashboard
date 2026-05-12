import {} from "./extensionMethods.js";

export function CreateElement(tag, options = {}, parent = null) {
    if (typeof options !== "object") throw new Error("OPTIONS MUST BE AN OBJECT");
    const element = document.createElement(tag);
    if (parent instanceof HTMLElement) {
        parent.appendChild(element);
    } else {
        document.body.appendChild(element);
    }
    element.applyOptions(options);
    return element;
}

export function Clamp(num, min, max) {
    return Math.max(min, Math.min(max, num));
}

export function RandomRange(min, max) {
    return Math.floor(Math.random() * max + min);
}
