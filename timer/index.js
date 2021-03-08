const path = require('path');
const electron = require('electron');

const { app, BrowserWindow, Tray } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 550,
        width: 350,
        frame: false,
        resizable: false,
        show: false
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    tray = new Tray(iconPath);
    tray.on('click', (event, bounds) => {
        // Click event bounds
        const { x, y } = bounds;

        // Window height and width
        const { height, width } = mainWindow.getBounds();
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        }
        else {
            const yPosition = process.platform === 'win32' ? y - height : y;
            mainWindow.setBounds({
                x: x - width / 2,
                y: yPosition,
                height,
                width
            })
            mainWindow.show();
        }
    })
});