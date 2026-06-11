"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncEngine = void 0;
const index_1 = require("../db/index");
const api_1 = require("./api");
const logger_1 = require("./logger");
const memoryCache_1 = require("../cache/memoryCache");
class SyncEngine {
    constructor() {
        this.isOnline = true;
        this.isSyncing = false;
        this.timer = null;
        // Do NOT auto-start here — main.ts must call start() after initDb()
    }
    // Called explicitly from main.ts after app.whenReady() and initDb()
    start() {
        this.startPolling();
    }
    setOnlineStatus(status) {
        this.isOnline = status;
        if (this.isOnline) {
            this.triggerSync();
        }
    }
    startPolling() {
        this.timer = setInterval(() => {
            this.triggerSync();
        }, 30000); // 30 seconds fallback
    }
    // Event-driven trigger
    async triggerSync() {
        if (!this.isOnline)
            return;
        // Mutex to prevent duplicate sync execution
        if (this.isSyncing) {
            logger_1.syncLogger.info('Sync already running, skipping trigger.');
            return;
        }
        this.isSyncing = true;
        try {
            await this.processQueue();
        }
        catch (error) {
            logger_1.syncLogger.error('Sync failed', error);
        }
        finally {
            this.isSyncing = false;
        }
    }
    async processQueue() {
        const queueStmt = index_1.db.prepare(`SELECT * FROM sync_queue ORDER BY timestamp ASC LIMIT 50`);
        const pendingItems = queueStmt.all();
        if (pendingItems.length === 0)
            return;
        for (const item of pendingItems) {
            const payload = JSON.parse(item.payload);
            try {
                const result = await api_1.api.syncEntity(item.entity_type, item.operation, payload);
                // 5. Server reconciliation response (Server must return canonical object)
                if (result.success && result.data) {
                    const canonicalData = result.data; // Server's source of truth
                    // If operation was not DELETE, update local DB and Cache with canonical data
                    if (item.operation !== 'DELETE') {
                        const updates = Object.keys(canonicalData).filter(k => k !== 'id').map(k => `${k} = @${k}`).join(', ');
                        const stmt = index_1.db.prepare(`UPDATE ${item.entity_type} SET ${updates} WHERE id = @id`);
                        stmt.run(canonicalData);
                        memoryCache_1.memoryCache.set(item.entity_type, canonicalData.id, canonicalData);
                    }
                    this.markSynced(item.id);
                }
                else if (result.conflict && result.serverData) {
                    this.resolveConflict(item.entity_type, payload, result.serverData);
                    this.markSynced(item.id); // Conflict resolved, remove from queue
                }
            }
            catch (error) {
                logger_1.syncLogger.error(`Failed to sync item ${item.id}`, error);
                // Exponential backoff or max retries can be tracked in operation_log
                this.markFailed(item.id);
            }
        }
    }
    markSynced(id) {
        const transaction = index_1.db.transaction(() => {
            index_1.db.prepare(`DELETE FROM sync_queue WHERE id = ?`).run(id);
            index_1.db.prepare(`UPDATE operation_log SET status = 'synced' WHERE id = ?`).run(id);
        });
        transaction();
        logger_1.syncLogger.info(`Successfully synced item`, { id });
    }
    markFailed(id) {
        index_1.db.prepare(`UPDATE operation_log SET status = 'failed' WHERE id = ?`).run(id);
    }
    resolveConflict(entityType, localData, serverData) {
        // 4. Strong Conflict Resolution (version + timestamp check)
        // Server wins if its version is strictly greater, or if versions match but it's newer
        const serverWins = serverData.version > localData.version ||
            (serverData.version === localData.version && serverData.updatedAt > localData.updatedAt);
        if (serverWins) {
            logger_1.syncLogger.info('Conflict resolved: Server wins', { entityType, id: localData.id });
            // Update local DB to match canonical server state
            const updates = Object.keys(serverData).filter(k => k !== 'id').map(k => `${k} = @${k}`).join(', ');
            const stmt = index_1.db.prepare(`UPDATE ${entityType} SET ${updates} WHERE id = @id`);
            stmt.run(serverData);
            // Update Cache safely
            memoryCache_1.memoryCache.set(entityType, serverData.id, serverData);
        }
        else {
            logger_1.syncLogger.info('Conflict resolved: Local wins', { entityType, id: localData.id });
            // In a full implementation, we might requeue the local item as an UPDATE
        }
    }
}
exports.syncEngine = new SyncEngine();
//# sourceMappingURL=syncEngine.js.map