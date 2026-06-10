// Global type augmentation so the renderer (Next.js pages/components)
// can use window.electron with full TypeScript safety.

import type { ElectronAPI } from "../electron/preload";

declare global {
  interface Window {
    /**
     * Available only when running inside Electron.
     * Always guard usage with: if (typeof window !== 'undefined' && window.electron)
     */
    electron?: ElectronAPI;
  }
}

export {};
