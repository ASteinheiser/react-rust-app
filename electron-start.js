const electron = require('electron');

// Create a new electron app!
const app = electron.app;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const START_URL = process.env.ELECTRON_START_URL || url.format({
  pathname: path.join(__dirname, '/build/index.html'),
  protocol: 'file:',
  slashes: true
});

const createWindow = () => {

  mainWindow = new BrowserWindow({ width: 800, height: 480 });

  mainWindow.loadURL(START_URL);

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});