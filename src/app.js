import { CreateElement } from "./helperFunctions.js";
import { buildForm } from "./form.js";
import { initItems, renderItem, clearRenderedItems } from "./items.js";

import { getAllItems, clearAllItems } from "./storage.js";

export function Init() {
    CreateElement(
        "h1",
        {
            innerText: "Personal Data Dashboard",
        },
        document.body,
    );
    CreateElement(
        "button",
        {
            innerText: "FULL RESET",

            onclick: () => {
                clearAllItems();
                clearRenderedItems();
            },
        },
        document.body,
    );
    buildForm(document.body);
    initItems(document.body);
    getAllItems().forEach(renderItem);
}
