const storageKey = "dashboardItems";

export function getAllItems() {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    return JSON.parse(raw);
}

function saveAllItems(items) {
    localStorage.setItem(storageKey, JSON.stringify(items));
}

export function addItem(name, content) {
    const items = getAllItems();
    const item = {
        id: Date.now(),
        name,
        content,
    };
    items.push(item);
    saveAllItems(items);
    return item;
}

export function updateItem(id, newName, newContent) {
    const items = getAllItems();
    const item = items.find(i => i.id === id);
    if (!item) return;
    if (newName) item.name = newName;
    if (newContent) item.content = newContent;
    saveAllItems(items);
}

export function removeItem(id) {
    const items = getAllItems().filter(item => item.id !== id);
    saveAllItems(items);
}

export function clearAllItems() {
    localStorage.removeItem(storageKey);
}
