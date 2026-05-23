import { CreateElement } from "./helperFunctions.js";
import { buildForm } from "./form.js";
import { init as initItemsContainer, renderItem, clearRenderedItems } from "./rendering.js";
import { getAllItems, clearAllItems as clearAllItemsFromStorage } from "./storage.js";
import { buildControls } from "./controls.js";

export function Init() {
    CreateElement("h1", {
        innerText: "Personal Data Dashboard",
    });
    buildForm();
    buildControls();
    initItemsContainer();
    getAllItems().forEach(renderItem);
}
