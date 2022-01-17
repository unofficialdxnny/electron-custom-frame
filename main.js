// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
// Needed to specify location of preload script
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      contextIsolation: true, // this is the default in Electron >= 12
      nodeIntegration: false, // this is the default in Electron >= 5
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools by default. You can open them via "View ➡ Toggle Developer Tools".
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Handle window controls via IPC
ipcMain.on('windowControls:maximize', (ipcEvent) => {
  const window = findBrowserWindow(ipcEvent)
  if (window.isMaximized()) {
    window.restore()
  } else {
    window.maximize()
  }
})

ipcMain.on('windowControls:minimize', (ipcEvent) => {
  const window = findBrowserWindow(ipcEvent)
  window.minimize()
})

ipcMain.on('windowControls:close', (ipcEvent) => {
  const window = findBrowserWindow(ipcEvent)
  window.close()
})

// ipcEvent.sender is the webContents that sent the message
// use BrowserWindow.fromWecContents to get the associated BrowserWindow instance
function findBrowserWindow (ipcEvent) {
  return BrowserWindow.fromWebContents(ipcEvent.sender)
}