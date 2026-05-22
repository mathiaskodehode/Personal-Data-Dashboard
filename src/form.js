import { CreateElement } from "./helperFunctions.js";
import { saveItem, deleteItem, getBuildKey } from "./storage.js";
import { renderItem, removeItem } from "./items.js";

export function buildForm(parent) {
    const form = CreateElement("form", {}, parent);

    const nameInput = createInput(
        form,
        "Item name",
        "itemName",
    );

    const contentInput = createInput(
        form,
        "Item content",
        "itemContent",
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

                if (content) {
                    saveItem(name, content);

                    renderItem({
                        key: getBuildKey(name),
                        name,
                        content,
                    });
                } else {
                    deleteItem(name);
                    removeItem(getBuildKey(name));
                }

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