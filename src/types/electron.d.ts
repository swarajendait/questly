// src/types/electron.d.ts

// This defines the functions we exposed in preload.ts for TypeScript
export interface IElectronAPI {
  minimizeWindow: () => void;
  closeWindow: () => void;
  // generateCategories: (interest: string) => Promise<string[]>; // It will return a promise with an array of strings
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}