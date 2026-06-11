"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupIpcHandlers = setupIpcHandlers;
const electron_1 = require("electron");
const queries_1 = require("../db/queries");
function setupIpcHandlers() {
    electron_1.ipcMain.handle('db:mutate', (_event, entityType, operation, payload) => {
        return (0, queries_1.mutateEntity)(entityType, operation, payload);
    });
    electron_1.ipcMain.handle('db:query', (_event, entityType, id) => {
        return (0, queries_1.queryEntity)(entityType, id);
    });
    electron_1.ipcMain.handle('db:queryAll', (_event, entityType) => {
        return (0, queries_1.queryAll)(entityType);
    });
    // Future expansion: sync status, log retrieval, etc.
}
//# sourceMappingURL=handlers.js.map