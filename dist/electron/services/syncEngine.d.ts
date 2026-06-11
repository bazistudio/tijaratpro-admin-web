declare class SyncEngine {
    private isOnline;
    private isSyncing;
    private timer;
    constructor();
    start(): void;
    setOnlineStatus(status: boolean): void;
    startPolling(): void;
    triggerSync(): Promise<void>;
    private processQueue;
    private markSynced;
    private markFailed;
    private resolveConflict;
}
export declare const syncEngine: SyncEngine;
export {};
//# sourceMappingURL=syncEngine.d.ts.map