import { CreateElement } from "./helperFunctions.js";

const prefix = "@@@stupidPrefix__";
let itemsContainer;
const renderedItems = new Map();

export function Init() {
    CreateElement("h1", { innerText: "Personal Data Dashboard" }, document.body);
    buildInputFields();
    itemsContainer = CreateElement("div", { id: "itemsContainer" }, document.body);
    loadExistingItems();
    CreateElement(
        "button",
        {
            innerText: "FULL RESET",
            onclick: resetAll,
        },
        document.body,
    );
}

function buildInputFields() {
    const form = CreateElement("form", {}, document.body);
    const nameContainer = CreateElement("div", {}, form);
    CreateElement(
        "label",
        {
            for: "itemName",
            innerText: "Item name",
        },
        nameContainer,
    );
    const nameInput = CreateElement(
        "input",
        {
            type: "text",
            id: "itemName",
        },
        nameContainer,
    );
    const contentContainer = CreateElement("div", {}, form);
    CreateElement(
        "label",
        {
            for: "itemContent",
            innerText: "Item content",
        },
        contentContainer,
    );
    const contentInput = CreateElement(
        "input",
        {
            type: "text",
            id: "itemContent",
        },
        contentContainer,
    );
    CreateElement(
        "button",
        {
            innerText: "Add",
            type: "button",
            onclick: () => {
                const name = nameInput.value.trim();
                const content = contentInput.value;

                if (!name) return;

                const key = `${prefix}${name}`;

                if (content) {
                    localStorage.setItem(key, content);

                    if (renderedItems.has(key)) {
                        updateItemElement(key, content);
                    } else {
                        createItemElement(key, content);
                    }
                } else {
                    removeItem(key);
                }

                nameInput.value = "";
                contentInput.value = "";
            },
        },
        form,
    );
}

function loadExistingItems() {
    Object.keys(localStorage)
        .filter(k => k.startsWith(prefix))
        .forEach(k => {
            createItemElement(k, localStorage.getItem(k));
        });
}

function createItemElement(key, content) {
    const itemContainer = CreateElement("div", {}, itemsContainer);
    const title = CreateElement(
        "h2",
        {
            innerText: key.replace(prefix, ""),
        },
        itemContainer,
    );
    const text = CreateElement(
        "p",
        {
            innerText: content,
        },
        itemContainer,
    );
    CreateElement(
        "button",
        {
            innerText: "X",
            onclick: () => removeItem(key),
        },
        itemContainer,
    );
    renderedItems.set(key, {
        element: itemContainer,
        title,
        text,
    });
}

function updateItemElement(key, newContent) {
    const item = renderedItems.get(key);
    if (!item) return;
    item.text.innerText = newContent;
}

function removeItem(key) {
    localStorage.removeItem(key);
    const item = renderedItems.get(key);
    if (!item) return;
    item.element.remove();
    renderedItems.delete(key);
}

function resetAll() {
    Object.keys(localStorage)
        .filter(k => k.startsWith(prefix))
        .forEach(k => localStorage.removeItem(k));
    renderedItems.forEach(item => {
        item.element.remove();
    });
    renderedItems.clear();
}
