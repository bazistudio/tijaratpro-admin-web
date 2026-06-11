"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutateEntity = mutateEntity;
exports.queryEntity = queryEntity;
exports.queryAll = queryAll;
const index_1 = require("./index");
const memoryCache_1 = require("../cache/memoryCache");
const uuid_1 = require("uuid");
const syncEngine_1 = require("../services/syncEngine");
// Abstracted mutation that handles Cache -> DB -> Queue -> Log
function mutateEntity(entityType, operation, payload) {
    const timestamp = Date.now();
    const opId = (0, uuid_1.v7)();
    // Ensure version is present and incremented
    if (operation === 'CREATE') {
        payload.version = 1;
    }
    else if (operation === 'UPDATE') {
        // We assume the payload includes the previous version, increment it.
        payload.version = (payload.version || 1) + 1;
    }
    payload.updatedAt = timestamp;
    // Phase 1: Atomic Database Write
    const transaction = index_1.db.transaction(() => {
        // 1. Update Local DB
        if (operation === 'CREATE') {
            const cols = Object.keys(payload).join(', ');
            const placeholders = Object.keys(payload).map(k => `@${k}`).join(', ');
            const stmt = index_1.db.prepare(`INSERT INTO ${entityType} (${cols}) VALUES (${placeholders})`);
            stmt.run(payload);
        }
        else if (operation === 'UPDATE') {
            const updates = Object.keys(payload).filter(k => k !== 'id').map(k => `${k} = @${k}`).join(', ');
            const stmt = index_1.db.prepare(`UPDATE ${entityType} SET ${updates} WHERE id = @id`);
            stmt.run(payload);
        }
        else if (operation === 'DELETE') {
            const stmt = index_1.db.prepare(`DELETE FROM ${entityType} WHERE id = ?`);
            stmt.run(payload.id);
        }
        // 2. Insert into sync_queue
        const queueStmt = index_1.db.prepare(`
      INSERT INTO sync_queue (id, entity_type, operation, payload, timestamp) 
      VALUES (@id, @entity_type, @operation, @payload, @timestamp)
    `);
        queueStmt.run({
            id: opId,
            entity_type: entityType,
            operation,
            payload: JSON.stringify(payload),
            timestamp
        });
        // 3. Insert into operation_log
        const logStmt = index_1.db.prepare(`
      INSERT INTO operation_log (id, entity_type, operation, payload, timestamp, status)
      VALUES (@id, @entity_type, @operation, @payload, @timestamp, 'pending')
    `);
        logStmt.run({
            id: opId,
            entity_type: entityType,
            operation,
            payload: JSON.stringify(payload),
            timestamp
        });
    });
    transaction();
    // Phase 2: Non-critical async operations
    if (operation === 'DELETE') {
        memoryCache_1.memoryCache.delete(entityType, payload.id);
    }
    else {
        memoryCache_1.memoryCache.set(entityType, payload.id, payload);
    }
    // Trigger Sync
    syncEngine_1.syncEngine.triggerSync().catch(console.error);
    return { success: true, opId };
}
function queryEntity(entityType, id) {
    // Check Cache first
    const cached = memoryCache_1.memoryCache.get(entityType, id);
    if (cached)
        return cached;
    const stmt = index_1.db.prepare(`SELECT * FROM ${entityType} WHERE id = ?`);
    const result = stmt.get(id);
    if (result) {
        memoryCache_1.memoryCache.set(entityType, id, result);
    }
    return result;
}
function queryAll(entityType) {
    const stmt = index_1.db.prepare(`SELECT * FROM ${entityType}`);
    return stmt.all();
}
//# sourceMappingURL=queries.js.map