import { storagePrefix } from "./constants.js";

export function getBuildKey(name) {
    return `${storagePrefix}${name}`;
}

export function getItemName(key) {
    return key.replace(storagePrefix, "");
}

export function saveItem(name, content) {
    localStorage.setItem(getBuildKey(name), content);
}

export function deleteItem(name) {
    localStorage.removeItem(getBuildKey(name));
}

export function getAllItems() {
    return Object.keys(localStorage)
        .filter(k => k.startsWith(storagePrefix))
        .map(k => ({
            key: k,
            name: getItemName(k),
            content: localStorage.getItem(k),
        }));
}

export function clearAllItems() {
    getAllItems().forEach(item => {
        localStorage.removeItem(item.key);
    });
}
