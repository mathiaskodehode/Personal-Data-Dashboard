import { CreateElement } from "./helperFunctions.js";
import { sortRenderedItems, filterRenderedItems } from "./rendering.js";

export function buildControls() {
    const container = CreateElement("div", { className: "controls" });
    CreateElement(
        "input",
        {
            type: "text",
            placeholder: "Search...",
            oninput: e => {
                filterRenderedItems(e.target.value);
            },
        },
        container,
    );
    CreateElement(
        "button",
        {
            innerText: "Alphabetically - Descending",
            onclick: () => {
                sortRenderedItems("A-Z");
            },
        },
        container,
    );
    CreateElement(
        "button",
        {
            innerText: "Alphabetically - Ascending",
            onclick: () => {
                sortRenderedItems("Z-A");
            },
        },
        container,
    );
    CreateElement(
        "button",
        {
            innerText: "Oldest",
            onclick: () => {
                sortRenderedItems("oldest");
            },
        },
        container,
    );
    CreateElement(
        "button",
        {
            innerText: "Newest",
            onclick: () => {
                sortRenderedItems("newest");
            },
        },
        container,
    );
}
