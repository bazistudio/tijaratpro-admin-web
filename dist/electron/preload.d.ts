import { IpcRendererEvent } from "electron";
export interface AppInfo {
    version: string;
    name: string;
    isDev: boolean;
    platform: NodeJS.Platform;
}
export interface ElectronAPI {
    /** Returns basic information about the running app */
    getAppInfo: () => Promise<AppInfo>;
    /** Quits the desktop application */
    quit: () => Promise<void>;
    /** Opens a URL safely in the system default browser */
    openExternal: (url: string) => Promise<void>;
    /** Subscribe to a named event pushed from the main process */
    on: (channel: string, listener: (event: IpcRendererEvent, ...args: unknown[]) => void) => void;
    /** Unsubscribe from a named main-process event */
    off: (channel: string, listener: (...args: unknown[]) => void) => void;
    db: {
        mutate: (entityType: string, operation: 'CREATE' | 'UPDATE' | 'DELETE', payload: any) => Promise<{
            success: boolean;
            opId: string;
        }>;
        query: (entityType: string, id: string) => Promise<any>;
        queryAll: (entityType: string) => Promise<any[]>;
    };
}
//# sourceMappingURL=preload.d.ts.map