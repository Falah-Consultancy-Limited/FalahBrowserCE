const { app, BrowserWindow, ipcMain, Tray, Menu, Notification } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const Store = require('electron-store');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const store = new Store();
let mainWindow;
let tray;
let pythonProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      webviewTag: true,
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, 'public/lantern.png'),
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function startPythonServer() {
  const backendPath = path.join(__dirname, '../backend/server.py');
  // Assume python3 is available. In a real app, we'd bundle it or check paths.
  pythonProcess = spawn('python3', [backendPath]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
  });
}

function setupTray() {
  tray = new Tray(path.join(__dirname, 'public/lantern.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show Browser', click: () => mainWindow.show() },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() }
  ]);
  tray.setToolTip('Falah Browser');
  tray.setContextMenu(contextMenu);
}

// Spiritual Manager Logic
async function checkPrayers() {
  const settings = store.get('settings') || { city: 'London', country: 'UK' };
  try {
    const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${settings.city}&country=${settings.country}`);
    const data = await response.json();
    if (data.code === 200) {
      store.set('prayerTimes', data.data.timings);
      // Logic for notifications would go here (interval check)
    }
  } catch (err) {
    console.error('Failed to fetch prayer times', err);
  }
}

app.whenReady().then(() => {
  startPythonServer();
  createWindow();
  setupTray();
  checkPrayers();
  
  setInterval(() => {
    // Check prayer times and send notifications
    const timings = store.get('prayerTimes');
    if (timings) {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      for (const [prayer, time] of Object.entries(timings)) {
        if (time === currentTime) {
          new Notification({
            title: 'Falah',
            body: `Time for ${prayer}. Come, let's stand before the One who hears all.`
          }).show();
        }
      }
    }
  }, 60000);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  if (pythonProcess) {
    pythonProcess.kill();
  }
});

// IPC Handlers
ipcMain.handle('get-settings', () => store.get('settings'));
ipcMain.handle('set-settings', (event, data) => store.set('settings', data));
ipcMain.handle('get-prayer-times', () => store.get('prayerTimes'));
ipcMain.handle('get-spiritual-acts', () => {
  const date = new Date().toISOString().split('T')[0];
  return store.get(`acts-${date}`) || { dhikr: 0, quran: 0, sadaqah: false };
});
ipcMain.handle('update-spiritual-act', (event, { act, value }) => {
  const date = new Date().toISOString().split('T')[0];
  const acts = store.get(`acts-${date}`) || { dhikr: 0, quran: 0, sadaqah: false };
  acts[act] = value;
  store.set(`acts-${date}`, acts);
  return acts;
});

ipcMain.handle('classify-page', async (event, { url, text }) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/classify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, text })
    });
    return await response.json();
  } catch (err) {
    return { verdict: 'safe', reason: 'AI server unavailable', evidence: '', alternatives: [] };
  }
});
