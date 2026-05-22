import { CreateElement } from "./helperFunctions.js";
import { deleteItem } from "./storage.js";

const renderedItems = new Map();

let container;

export function initItems(parent) {
    container = CreateElement("div", { id: "itemsContainer" }, parent);
}

export function renderItem(item) {
    if (renderedItems.has(item.key)) {
        updateItem(item.key, item.content);
        return;
    }

    const element = CreateElement("div", {}, container);

    CreateElement(
        "h2",
        {
            innerText: item.name,
        },
        element,
    );

    const text = CreateElement(
        "p",
        {
            innerText: item.content,
        },
        element,
    );

    CreateElement(
        "button",
        {
            innerText: "X",
            onclick: () => removeItem(item.key),
        },
        element,
    );

    renderedItems.set(item.key, {
        element,
        text,
    });
}

export function updateItem(key, content) {
    const item = renderedItems.get(key);

    if (!item) return;

    item.text.innerText = content;
}

export function removeItem(key) {
    deleteItem(key.replace(/^.*__/, ""));

    const item = renderedItems.get(key);

    if (!item) return;

    item.element.remove();

    renderedItems.delete(key);
}

export function clearRenderedItems() {
    renderedItems.forEach(item => {
        item.element.remove();
    });

    renderedItems.clear();
}
