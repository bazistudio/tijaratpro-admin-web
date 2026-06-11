"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const window_1 = require("./window");
const security_1 = require("./security");
const index_1 = require("./db/index");
const handlers_1 = require("./ipc/handlers");
const syncEngine_1 = require("./services/syncEngine");
// --------------------------------------------------------------------------
// Environment helpers
// --------------------------------------------------------------------------
const isDev = !electron_1.app.isPackaged;
const NEXT_DEV_URL = "http://localhost:3000";
// --------------------------------------------------------------------------
// App lifecycle
// --------------------------------------------------------------------------
let mainWindow = null;
electron_1.app.whenReady().then(async () => {
    // 1. Harden security before any window opens
    (0, security_1.setupSecurity)();
    // 1.5 Init Local Database, IPC and Sync Engine
    (0, index_1.initDb)();
    (0, handlers_1.setupIpcHandlers)();
    syncEngine_1.syncEngine.start(); // MUST be called after initDb()
    // 2. Create the main window
    mainWindow = (0, window_1.createWindow)();
    // 3. Load the web content
    if (isDev) {
        // In development: connect to the running `next dev` server
        await mainWindow.loadURL(NEXT_DEV_URL);
        mainWindow.webContents.openDevTools({ mode: "detach" });
    }
    else {
        // In production: load the Next.js static export from `out/`
        const indexPath = path_1.default.join(__dirname, "../out/index.html");
        await mainWindow.loadFile(indexPath);
    }
    // 4. Open external links in the system browser, not in Electron
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (!url.startsWith("file://") && !url.startsWith(NEXT_DEV_URL)) {
            electron_1.shell.openExternal(url);
            return { action: "deny" };
        }
        return { action: "allow" };
    });
    // macOS: re-create window when the dock icon is clicked and no windows exist
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            mainWindow = (0, window_1.createWindow)();
        }
    });
});
// Quit when all windows are closed (except macOS)
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
// --------------------------------------------------------------------------
// IPC handlers (renderer ↔ main)
// --------------------------------------------------------------------------
/** Renderer can ask for basic app info */
electron_1.ipcMain.handle("app:getInfo", () => ({
    version: electron_1.app.getVersion(),
    name: electron_1.app.getName(),
    isDev,
    platform: process.platform,
}));
/** Renderer can trigger a graceful quit */
electron_1.ipcMain.handle("app:quit", () => {
    electron_1.app.quit();
});
/** Renderer can open a URL in the system browser */
electron_1.ipcMain.handle("app:openExternal", (_event, url) => {
    const safeUrl = new URL(url); // throws on invalid URLs
    if (safeUrl.protocol === "https:" || safeUrl.protocol === "http:") {
        electron_1.shell.openExternal(url);
    }
});
//# sourceMappingURL=main.js.map