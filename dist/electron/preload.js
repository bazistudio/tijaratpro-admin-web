"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// --------------------------------------------------------------------------
// Allowed IPC channels (whitelist for security)
// --------------------------------------------------------------------------
const ALLOWED_CHANNELS = ["app:notification", "app:updateAvailable"];
function isAllowedChannel(channel) {
    return ALLOWED_CHANNELS.includes(channel);
}
// --------------------------------------------------------------------------
// Expose the API on window.electron
// --------------------------------------------------------------------------
const electronAPI = {
    getAppInfo: () => electron_1.ipcRenderer.invoke("app:getInfo"),
    quit: () => electron_1.ipcRenderer.invoke("app:quit"),
    openExternal: (url) => electron_1.ipcRenderer.invoke("app:openExternal", url),
    on: (channel, listener) => {
        if (!isAllowedChannel(channel)) {
            console.warn(`[preload] Blocked subscription to unknown channel: ${channel}`);
            return;
        }
        electron_1.ipcRenderer.on(channel, listener);
    },
    off: (channel, listener) => {
        if (!isAllowedChannel(channel))
            return;
        electron_1.ipcRenderer.off(channel, listener);
    },
    db: {
        mutate: (entityType, operation, payload) => electron_1.ipcRenderer.invoke('db:mutate', entityType, operation, payload),
        query: (entityType, id) => electron_1.ipcRenderer.invoke('db:query', entityType, id),
        queryAll: (entityType) => electron_1.ipcRenderer.invoke('db:queryAll', entityType),
    }
};
electron_1.contextBridge.exposeInMainWorld("electron", electronAPI);
//# sourceMappingURL=preload.js.map