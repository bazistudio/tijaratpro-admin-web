"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.getDb = getDb;
exports.initDb = initDb;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const schema_1 = require("./schema");
// db is initialized lazily inside initDb() — NEVER at module load time.
// app.getPath() is only valid after app is ready.
let _db = null;
function getDb() {
    if (!_db) {
        throw new Error('[DB] Database not initialized. Call initDb() first inside app.whenReady().');
    }
    return _db;
}
// Proxy db reference — routes all calls to the lazily-initialized _db instance.
// Typed explicitly so TypeScript can name it in .d.ts declarations (fixes TS4023).
exports.db = new Proxy({}, {
    get(_target, prop) {
        return getDb()[prop];
    }
});
function initDb() {
    if (_db)
        return; // Idempotent — safe to call multiple times
    const dbPath = path_1.default.join(electron_1.app.getPath('userData'), 'tijarat_local.db');
    _db = new better_sqlite3_1.default(dbPath, {
    // Remove verbose in production — swap with syncLogger
    });
    // Enforce WAL mode for concurrency and foreign key constraints
    _db.pragma('journal_mode = WAL');
    _db.pragma('foreign_keys = ON');
    (0, schema_1.initializeSchema)(_db);
}
//# sourceMappingURL=index.js.map