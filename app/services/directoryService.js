'use strict';

angular.module("app").service("DirectoryService", function(){

    var fs = require('fs');

    // Verifies that the path exists and creates it if not
    this.verifyAndCreate = function(path){
        if (!this.pathExists(path)) {
            fs.mkdirSync(path);
        }
    };

    // Determines if the path exists
    this.pathExists = function(path){
        return fs.existsSync(path);
    }
});