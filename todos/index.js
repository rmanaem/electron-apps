const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;


let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on('closed', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 400,
        height: 300,
        title: 'New Todo',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    addWindow.loadURL(`file://${__dirname}/add.html`);
    addWindow.on('closed', () => addWindow = null);
}

ipcMain.on('add todo', (event, todo) => {
    mainWindow.webContents.send('add todo', todo);
    addWindow.close();
});

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Todo',
                accelerator: process.platform === 'darwin' ? 'Command+N' : 'Ctrl+N',
                click() { createAddWindow(); }
            },
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() { app.quit(); }
            }
        ]
    }
];

if (process.platform == 'darwin') {
    menuTemplate.unshift({});
}

if (process.env.NODE_ENV != 'production') {
    menuTemplate.push({
        label: 'View',
        submenu: [{
            label: 'Toggle Developer Tools',
            accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        }]
    });
}