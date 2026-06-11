import fs from 'fs';
import path from 'path';
import { app } from 'electron';

const logDir = path.join(app.getPath('userData'), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const syncLogPath = path.join(logDir, 'sync.log');

export const syncLogger = {
  info: (message: string, meta: any = {}) => {
    const entry = `[INFO] ${new Date().toISOString()} - ${message} - ${JSON.stringify(meta)}\n`;
    fs.appendFileSync(syncLogPath, entry);
  },
  error: (message: string, error: any) => {
    const entry = `[ERROR] ${new Date().toISOString()} - ${message} - ${error?.message || error}\n`;
    fs.appendFileSync(syncLogPath, entry);
  }
};
