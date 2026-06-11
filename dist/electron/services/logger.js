"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncLogger = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
// Lazily resolved on first write — safe before app.whenReady()
let syncLogPath = null;
function getLogPath() {
    if (!syncLogPath) {
        const logDir = path_1.default.join(electron_1.app.getPath('userData'), 'logs');
        if (!fs_1.default.existsSync(logDir)) {
            fs_1.default.mkdirSync(logDir, { recursive: true });
        }
        syncLogPath = path_1.default.join(logDir, 'sync.log');
    }
    return syncLogPath;
}
exports.syncLogger = {
    info: (message, meta = {}) => {
        const entry = `[INFO] ${new Date().toISOString()} - ${message} - ${JSON.stringify(meta)}\n`;
        fs_1.default.appendFileSync(getLogPath(), entry);
    },
    error: (message, error) => {
        const entry = `[ERROR] ${new Date().toISOString()} - ${message} - ${error?.message || error}\n`;
        fs_1.default.appendFileSync(getLogPath(), entry);
    }
};
//# sourceMappingURL=logger.js.map