const electron = require('electron');
const { Tray, app, Menu } = electron;

class TimerTray extends Tray {
    constructor(iconPath, window) {
        super(iconPath);

        this.window = window;
        this.setToolTip('Timer App 1.0.0');
        this.on('click', this.onClick.bind(this));
        this.on('right-click', this.onRightClick.bind(this));
    }

    onClick(event, bounds) {
        // Click event bounds
        const { x, y } = bounds;

        // Window height and width
        const { height, width } = this.window.getBounds();
        if (this.window.isVisible()) {
            this.window.hide();
        }
        else {
            const yPosition = process.platform === 'win32' ? y - height : y;
            this.window.setBounds({
                x: x - width / 2,
                y: yPosition,
                height,
                width
            })
            this.window.show();
        }
    }

    onRightClick() {
        const menuConfig = Menu.buildFromTemplate([
            {
                label: 'Quit',
                click: () => app.quit()
            }
        ]);

        this.popUpContextMenu(menuConfig);
    }
}

module.exports = TimerTray;