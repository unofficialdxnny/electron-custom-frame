// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

// title bar


const { contextBridge, ipcRenderer } = require('electron')

// Set up context bridge between the renderer process and the main process
contextBridge.exposeInMainWorld(
  'windowControls',
  {
    close: () => ipcRenderer.send('windowControls:close'),
    maximize: () => ipcRenderer.send('windowControls:maximize'),
    minimize: () => ipcRenderer.send('windowControls:minimize')
  }
)