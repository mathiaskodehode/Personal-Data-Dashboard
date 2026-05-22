import { CreateElement } from "./helperFunctions.js";
import { removeItem as removeStoredItem, updateItem } from "./storage.js";

const renderedItems = new Map();
let container;

export function initItems(parent) {
    container = CreateElement("div", { id: "itemsContainer" }, parent);
}

export function renderItem(item) {
    if (renderedItems.has(item.id)) return;
    const element = CreateElement("div", {}, container);
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

function toggleEditMode(renderedItem) {
    if (renderedItem.isEditing) {
        saveEditMode(renderedItem);
    } else {
        enableEditMode(renderedItem);
    }
}

function enableEditMode(renderedItem) {
    renderedItem.isEditing = true;
    renderedItem.title.style.display = "none";
    renderedItem.text.style.display = "none";
    renderedItem.titleInput = createEditInput(renderedItem.title.innerText, renderedItem.element);
    renderedItem.contentInput = createEditInput(renderedItem.text.innerText, renderedItem.element);
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

function createEditInput(value, parent) {
    return CreateElement(
        "input",
        {
            type: "text",
            value,
        },
        parent,
    );
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
