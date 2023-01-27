// Global npm libraries
const { app, BrowserWindow, dialog } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

// Local libraries
// const ServerSideServices = require('../src/services/server-side-services')
const Server = require('../src/backend/server')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({ width: 900, height: 680 })
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
  mainWindow.on('closed', () => { mainWindow = null })
}

// app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// Main function that starts the Electron app and background services like IPFS.
async function run () {
  try {
    try {
      await app.whenReady()

      createWindow()
    } catch (e) {
      dialog.showErrorBox('Electron could not start', e.stack)
      app.exit(1)
    }

    // const serverSideServices = new ServerSideServices()
    // serverSideServices.start()
    const server = new Server()
    await server.startServer()
  } catch (err) {
    console.error('Error in run(): ', err)
  }
}
run()
