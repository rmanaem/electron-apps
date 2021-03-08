const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
    constructor(options) {
        super(options);

        this.on('blur', this.blur.bind(this));
    }

    blur() {
        this.hide();
    }
}

module.exports = MainWindow;