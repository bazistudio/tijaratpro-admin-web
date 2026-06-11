// Wrapper for window.electron.db to provide a clean API to Next.js

export const localDb = {
  async mutate(entityType: string, operation: 'CREATE' | 'UPDATE' | 'DELETE', payload: any) {
    if (typeof window !== 'undefined' && window.electron?.db) {
      return await window.electron.db.mutate(entityType, operation, payload);
    }
    console.warn('Electron API not available. Cannot mutate:', { entityType, operation, payload });
    return { success: false, opId: null };
  },

  async query(entityType: string, id: string) {
    if (typeof window !== 'undefined' && window.electron?.db) {
      return await window.electron.db.query(entityType, id);
    }
    console.warn('Electron API not available. Cannot query:', { entityType, id });
    return null;
  },

  async queryAll(entityType: string) {
    if (typeof window !== 'undefined' && window.electron?.db) {
      return await window.electron.db.queryAll(entityType);
    }
    console.warn('Electron API not available. Cannot queryAll:', { entityType });
    return [];
  }
};

// Next.js types for window.electron
declare global {
  interface Window {
    electron: {
      db: {
        mutate: (entityType: string, operation: 'CREATE' | 'UPDATE' | 'DELETE', payload: any) => Promise<{ success: boolean; opId: string }>;
        query: (entityType: string, id: string) => Promise<any>;
        queryAll: (entityType: string) => Promise<any[]>;
      };
      // add other methods from preload...
    };
  }
}
