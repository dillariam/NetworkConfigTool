'use strict';

var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 1240,
        icon:  __dirname + '/app/img/toolkit.png',
        //frame: false,
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

});
