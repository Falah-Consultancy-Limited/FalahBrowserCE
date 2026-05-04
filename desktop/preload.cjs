const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('falahAPI', {
  getSettings: () => ipcRenderer.invoke('get-settings'),
  setSettings: (data) => ipcRenderer.invoke('set-settings', data),
  getPrayerTimes: () => ipcRenderer.invoke('get-prayer-times'),
  getSpiritualActs: () => ipcRenderer.invoke('get-spiritual-acts'),
  updateSpiritualAct: (act, value) => ipcRenderer.invoke('update-spiritual-act', { act, value }),
  classifyPage: (url, text) => ipcRenderer.invoke('classify-page', { url, text }),
  getTodayVerse: () => {
    const verses = [
      { text: "Indeed, prayer prohibits immorality and wrongdoing.", reference: "Quran 29:45" },
      { text: "And He found you lost and guided you.", reference: "Quran 93:7" },
      { text: "So remember Me; I will remember you.", reference: "Quran 2:152" },
      { text: "My mercy encompasses all things.", reference: "Quran 7:156" }
    ];
    const day = new Date().getDate() % verses.length;
    return verses[day];
  },
  onLanternUpdate: (callback) => ipcRenderer.on('lantern-update', (event, ...args) => callback(...args)),
});
