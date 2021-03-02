const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({ webPreferences: { nodeIntegration: true } });
    mainWindow.loadURL(`file::/${__dirname}/index.html`);
});

ipcMain.on('videofilepath', (event, path) => {
    ffmpeg.ffprobe(path, (err, metadata) => {
        mainWindow.webContents.send('videofilelength', metadata.format.duration);
    });
});