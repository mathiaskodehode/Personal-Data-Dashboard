import { CreateElement } from "./helperFunctions.js";
import { removeItem as removeStoredItem, updateItem } from "./storage.js";
import { getAllItems } from "./storage.js";

// note to self: map == c# dictionary
const renderedItems = new Map();
let itemsContainer;

export function init() {
    itemsContainer = CreateElement("div", { id: "itemsContainer" });
}

export function renderItem(item) {
    if (renderedItems.has(item.id)) return;
    const element = CreateElement("div", { className: "itemCard" }, itemsContainer);
    const title = CreateElement("h2", { innerText: item.name }, element);
    const text = CreateElement("p", { innerText: item.content }, element);
    const editBtn = CreateElement("button", { innerText: "Edit" }, element);
    CreateElement(
        "button",
        {
            innerText: "Delete",
            onclick: () => removeRenderedItem(item.id),
        },
        element,
    );
    const renderedItem = {
        item,
        element,
        title,
        text,
        editBtn,
        titleInput: null,
        contentInput: null,
        isEditing: false,
    };
    editBtn.onclick = () => {
        toggleEditMode(renderedItem);
    };
    renderedItems.set(item.id, renderedItem);
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

export function filterRenderedItems(filter) {
    filter = filter.toLowerCase();
    renderedItems.forEach(renderedItem => {
        const matchesName = renderedItem.item.name.toLowerCase().includes(filter);
        const matchesContent = renderedItem.item.content.toLowerCase().includes(filter);
        renderedItem.element.style.display = matchesName || matchesContent ? "" : "none";
    });
}

export function sortRenderedItems(sorting) {
    const items = [...renderedItems.values()];
    switch (sorting.toLowerCase()) {
        case "a-z":
            items.sort((a, b) => a.item.name.localeCompare(b.item.name));
            break;
        case "z-a":
            items.sort((a, b) => b.item.name.localeCompare(a.item.name));
            break;
        case "oldest":
            items.sort((a, b) => a.item.createdAt - b.item.createdAt);
            break;
        case "newest":
            items.sort((a, b) => b.item.createdAt - a.item.createdAt);
            break;
    }
    items.forEach(e => itemsContainer.appendChild(e.element));
}

function toggleEditMode(renderedItem) {
    if (renderedItem.isEditing) {
        saveEditMode(renderedItem);
    } else {
        enableEditMode(renderedItem);
    }
}

// TODO: do something about this. Even though it works I don't like how the code looks.
function enableEditMode(renderedItem) {
    renderedItem.isEditing = true;
    renderedItem.title.style.display = "none";
    renderedItem.text.style.display = "none";
    renderedItem.titleInput = createEditInput(renderedItem.title.innerText, "titleInput");
    renderedItem.contentInput = createEditTextarea(renderedItem.text.innerText);
    renderedItem.element.insertBefore(renderedItem.titleInput, renderedItem.editBtn);
    renderedItem.element.insertBefore(renderedItem.contentInput, renderedItem.editBtn);
    renderedItem.editBtn.innerText = "Save";
}

function saveEditMode(renderedItem) {
    const values = getEditValues(renderedItem);
    if (!values) return;
    applyItemValues(renderedItem, values);
    disableEditMode(renderedItem);
    updateItem(renderedItem.item.id, values.name, values.content);
}

function getEditValues(renderedItem) {
    const name = renderedItem.titleInput.value.trim();
    const content = renderedItem.contentInput.value.trim();
    if (!name || !content) return null;
    return { name, content };
}

function applyItemValues(renderedItem, values) {
    renderedItem.item.name = values.name;
    renderedItem.item.content = values.content;

    renderedItem.title.innerText = values.name;
    renderedItem.text.innerText = values.content;
}

function disableEditMode(renderedItem) {
    renderedItem.titleInput.remove();
    renderedItem.contentInput.remove();
    renderedItem.titleInput = null;
    renderedItem.contentInput = null;
    renderedItem.title.style.display = "";
    renderedItem.text.style.display = "";
    renderedItem.editBtn.innerText = "Edit";
    renderedItem.isEditing = false;
}

function createEditInput(value, className) {
    return CreateElement("input", {
        type: "text",
        value,
        className,
    });
}

function createEditTextarea(value) {
    return CreateElement(
        "textarea",
        {
            value,
            className: "contentInput",
        },
    );
}
