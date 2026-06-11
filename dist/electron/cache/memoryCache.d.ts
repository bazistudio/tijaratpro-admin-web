export declare class MemoryCache {
    private cache;
    constructor();
    private getKey;
    get(entityType: string, id: string): any;
    set(entityType: string, id: string, data: any): void;
    delete(entityType: string, id: string): void;
    clear(): void;
}
export declare const memoryCache: MemoryCache;
//# sourceMappingURL=memoryCache.d.ts.map