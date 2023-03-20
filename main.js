'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const { join } = require('path');
const { autoUpdater, AppUpdater } = require('electron-updater');

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

let win;

const showMSGGUI = (chanel, ...msg) => {
    win.webContents.send(chanel, msg);
}

app.on('ready', () => {

    setUpdaterListeners();

     win = new BrowserWindow({
        show: false,
        webPreferences: {
            preload: join(__dirname, './main/preload.js')
        }
    })   

    win.on('ready-to-show', () => {
        win.show();
        win.webContents.openDevTools();
        showMSGGUI('version', app.getVersion());
        showMSGGUI('update', 'checking for update');
        autoUpdater.checkForUpdates();
    })

    win.loadFile('./main/index.html');
})



const setUpdaterListeners = () => {
    autoUpdater.on('update-available', (info) => {
        showMSGGUI('update', 'update-available', info);
        const path = autoUpdater.downloadUpdate();
        showMSGGUI('update', path);
    });

    autoUpdater.on('update-not-available', (info) => {
        showMSGGUI('update', 'update-not-available', info);
    });
 
    autoUpdater.on('update-downloaded', (info) => {
        showMSGGUI('update', 'update-downloaded', info);
    });

    autoUpdater.on('error', (info) => {
        showMSGGUI('update', 'error', info);
    });
}

