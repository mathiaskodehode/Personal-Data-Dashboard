import { CreateElement } from "./helperFunctions.js";

const prefix = "@@@stupidPrefix__";
let itemsContainer;

export function Init() {
    CreateElement("h1", { innerText: "Personal Data Dashboard" });
    buildInputFields();
    itemsContainer = CreateElement("div", { id: "itemsContainer" });
    buildItems();
    CreateElement("button", {
        innerText: "FULL RESET",
        onclick: e => {
            localStorage.clear();
            buildItems();
        },
    });
}

function buildInputFields() {
    const form = CreateElement("form", {}, parent);
    let container = CreateElement("div", {}, form);
    CreateElement("label", { for: "itemName", innerText: "Item name" }, container);
    const name = CreateElement("input", { type: "text", id: "itemName", name: "itemname" }, container);
    container = CreateElement("div", {}, form);
    CreateElement("label", { for: "itemContent", innerText: "Item content" }, container);
    const content = CreateElement("input", { type: "text", id: "itemContent", name: "itemContent" }, container);
    // the button is not a child of form because I don't like how it refreshes the page when you press the button
    const btn = CreateElement("button", { innerText: "Add" });
    btn.addEventListener("click", e => {
        const key = `${prefix}${name.value}`;
        if (content.value) localStorage.setItem(key, content.value);
        else localStorage.removeItem(key);
        buildItems();
    });
}

function buildItems() {
    while (itemsContainer.children[0]) itemsContainer.children[0].remove();
    const keys = Object.keys(localStorage).filter(k => k.includes(prefix));
    keys.forEach(k => {
        const itemContainer = CreateElement("div", {}, itemsContainer);
        CreateElement("h2", { innerText: k.replace(prefix, "") }, itemContainer);
        CreateElement("p", { innerText: localStorage.getItem(k) }, itemContainer);
        const btn = CreateElement("button", { innerText: "X" }, itemContainer);
        btn.addEventListener("click", e => {
            localStorage.removeItem(k);
            buildItems(itemsContainer);
        });
    });
}
