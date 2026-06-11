import Database, { Database as BetterSqlite3Database } from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';
import { initializeSchema } from './schema';

// Get the user data path (e.g. AppData on Windows)
// This ensures DB is stored securely and not wiped during app updates.
const dbPath = path.join(app.getPath('userData'), 'tijarat_local.db');

export const db: BetterSqlite3Database = new Database(dbPath, {
  verbose: console.log // Only for dev, remove in prod or use logger
});

// Enforce foreign key constraints
db.pragma('journal_mode = WAL'); // Better performance and concurrency
db.pragma('foreign_keys = ON');

export function initDb() {
  initializeSchema(db);
}
