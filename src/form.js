import { CreateElement } from "./helperFunctions.js";
import { addItem } from "./storage.js";
import { renderItem } from "./items.js";

export function buildForm(parent) {
    const form = CreateElement("form", {}, parent);
    const nameInput = createInput(form, "Item name", "itemName");
    const contentInput = createInput(form, "Item content", "itemContent");

    CreateElement(
        "button",
        {
            innerText: "Add",
            type: "button",
            onclick: () => {
                const name = nameInput.value.trim();
                const content = contentInput.value.trim();
                if (!name || !content) return;
                const item = addItem(name, content);
                renderItem(item);
                nameInput.value = "";
                contentInput.value = "";
            },
        },
        form,
    );
}

function createInput(parent, labelText, id) {
    const container = CreateElement("div", {}, parent);
    CreateElement(
        "label",
        {
            for: id,
            innerText: labelText,
        },
        container,
    );
    return CreateElement(
        "input",
        {
            type: "text",
            id,
        },
        container,
    );
}
