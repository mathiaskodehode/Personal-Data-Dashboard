const storageKey = "dashboardItems";

export function getAllItems() {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    return JSON.parse(raw);
}

function saveItems(items) {
    localStorage.setItem(storageKey, JSON.stringify(items));
}

export function addItem(name, content) {
    const items = getAllItems();
    const item = {
        id: Date.now(),
        name,
        content,
        createdAt: Date.now(),
    };
    items.push(item);
    saveItems(items);
    return item;
}

export function updateItem(id, newName, newContent) {
    const items = getAllItems();
    const item = items.find(i => i.id === id);
    if (!item) return;
    if (newName) item.name = newName;
    if (newContent) item.content = newContent;
    saveItems(items);
}

export function removeItem(id) {
    const items = getAllItems().filter(item => item.id !== id);
    saveItems(items);
}

export function clearAllItems() {
    localStorage.removeItem(storageKey);
}
