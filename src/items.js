import { CreateElement } from "./helperFunctions.js";
import { removeItem as removeStoredItem } from "./storage.js";

const renderedItems = new Map();
let container;

export function initItems(parent) {
    container = CreateElement("div", { id: "itemsContainer" }, parent);
}

export function renderItem(item) {
    if (renderedItems.has(item.id)) {
        updateRenderedItem(item.id, item.content);
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
            onclick: () => removeRenderedItem(item.id),
        },
        element,
    );
    renderedItems.set(item.id, {
        element,
        text,
    });
}

function updateRenderedItem(id, content) {
    const item = renderedItems.get(id);
    if (!item) return;
    item.text.innerText = content;
}

export function removeRenderedItem(id) {
    removeStoredItem(id);
    const item = renderedItems.get(id);
    if (!item) return;
    item.element.remove();
    renderedItems.delete(id);
}

export function clearRenderedItems() {
    renderedItems.forEach(item => {
        item.element.remove();
    });
    renderedItems.clear();
}
