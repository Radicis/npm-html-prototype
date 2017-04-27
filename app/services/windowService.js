'use strict';

angular.module('app').service('WindowService', function(){

    var remote = require('electron').remote;

    // Closes the electorn host window
    this.close = function(){
        var window = remote.getCurrentWindow();
        window.close();
    };

    // Maximises the e letron host window and unmaximises it
    this.maximise = function(){
        var window = remote.getCurrentWindow();
        if (!window.isMaximized()) {
            window.maximize();
        } else {
            window.unmaximize();
        }
    };

    // minimises the electorn host window
    this.minimise = function(){
        var window = remote.getCurrentWindow();
        window.minimize();
    };
});