"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWindow = createWindow;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
function getInitialWindowState() {
    // Default: 80% of the primary display, centred
    const { width: sw, height: sh } = electron_1.screen.getPrimaryDisplay().workAreaSize;
    return {
        width: Math.round(sw * 0.85),
        height: Math.round(sh * 0.9),
        isMaximized: false,
    };
}
// --------------------------------------------------------------------------
// createWindow  –  call from main.ts after app is ready
// --------------------------------------------------------------------------
function createWindow() {
    const state = getInitialWindowState();
    const win = new electron_1.BrowserWindow({
        // ── Size & position ──────────────────────────────────────────────────
        width: state.width,
        height: state.height,
        minWidth: 1024,
        minHeight: 680,
        center: true,
        // ── Appearance ───────────────────────────────────────────────────────
        title: "Tijarat Pro – Admin",
        backgroundColor: "#0a0a0a", // matches your dark theme bg
        show: false, // avoid flicker; show after ready
        // Windows: frame:true gives native min/max/close controls.
        // macOS: titleBarStyle:'hidden' keeps traffic lights but hides the bar.
        frame: true,
        titleBarStyle: process.platform === "darwin" ? "hidden" : "default",
        trafficLightPosition: { x: 16, y: 16 }, // macOS traffic lights inset (ignored on Windows)
        // ── Security ─────────────────────────────────────────────────────────
        webPreferences: {
            // Point to the compiled preload script
            preload: path_1.default.join(__dirname, "preload.js"),
            // Security hardening
            contextIsolation: true, // renderer cannot access Node APIs
            nodeIntegration: false, // no Node in renderer
            sandbox: true, // OS-level sandbox
            webSecurity: true,
            allowRunningInsecureContent: false,
            // Disable features the admin panel doesn't need
            spellcheck: false,
        },
    });
    // ── Show window only when content is painted (no white flash) ──────────
    win.once("ready-to-show", () => {
        if (state.isMaximized) {
            win.maximize();
        }
        else {
            win.show();
        }
    });
    // ── Window state tracking ──────────────────────────────────────────────
    const saveState = () => {
        if (!win.isDestroyed()) {
            state.isMaximized = win.isMaximized();
            if (!state.isMaximized) {
                const bounds = win.getBounds();
                state.width = bounds.width;
                state.height = bounds.height;
                state.x = bounds.x;
                state.y = bounds.y;
            }
        }
    };
    win.on("resize", saveState);
    win.on("move", saveState);
    win.on("close", saveState);
    // ── IPC: custom title-bar controls ─────────────────────────────────────
    // These are handled through preload → ipcRenderer → ipcMain automatically
    // via the handlers in main.ts. Extend here if you add a custom title bar.
    return win;
}
//# sourceMappingURL=window.js.map