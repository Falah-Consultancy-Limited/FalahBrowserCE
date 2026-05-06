const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  app: {
    getVersion: () => ipcRenderer.invoke('app-get-version'),
    getPath: (pathName) => ipcRenderer.invoke('app-get-path', pathName),
  },
  ipcRenderer: {
    on: (channel, listener) => ipcRenderer.on(channel, listener),
    send: (channel, args) => ipcRenderer.send(channel, args),
    invoke: (channel, args) => ipcRenderer.invoke(channel, args),
  }
});