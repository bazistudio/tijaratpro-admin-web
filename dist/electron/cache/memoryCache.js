"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoryCache = exports.MemoryCache = void 0;
class MemoryCache {
    constructor() {
        this.cache = new Map();
    }
    // Generate composite keys like "users:123"
    getKey(entityType, id) {
        return `${entityType}:${id}`;
    }
    get(entityType, id) {
        return this.cache.get(this.getKey(entityType, id));
    }
    set(entityType, id, data) {
        const key = this.getKey(entityType, id);
        const existing = this.cache.get(key);
        // Only update cache if new data has higher or equal version, OR if it's new
        if (!existing || data.version >= existing.version) {
            this.cache.set(key, data);
        }
    }
    delete(entityType, id) {
        this.cache.delete(this.getKey(entityType, id));
    }
    clear() {
        this.cache.clear();
    }
}
exports.MemoryCache = MemoryCache;
exports.memoryCache = new MemoryCache();
//# sourceMappingURL=memoryCache.js.map