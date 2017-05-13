'use strict';

angular.module('app').service('WindowService', function(){

    var remote = require('electron').remote;

    // Closes the electron host window
    this.close = function(){
        var window = remote.getCurrentWindow();
        window.close();
    };

    // Maximises the electron host window and unmaximises it
    this.maximise = function(){
        var window = remote.getCurrentWindow();
        if (!window.isMaximized()) {
            window.maximize();
        } else {
            window.unmaximize();
        }
    };

    // Minimises the electron host window
    this.minimise = function(){
        var window = remote.getCurrentWindow();
        window.minimize();
    };
});