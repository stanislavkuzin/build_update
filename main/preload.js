const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('example', {
  addUpdateMSGHandler: (callback) => ipcRenderer.on('update', callback),
  addVersionMSGHandler: (callback) => ipcRenderer.on('version', callback)
});
