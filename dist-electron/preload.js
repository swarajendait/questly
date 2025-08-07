// electron/preload.ts
import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('electronAPI', {
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    closeWindow: () => ipcRenderer.send('close-window'),
    generateCategories: (interest) => ipcRenderer.invoke('generate-categories', interest),
    evaluateSubmission: (args) => ipcRenderer.invoke('evaluate-submission', args),
});
