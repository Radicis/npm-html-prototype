angular.module("app").service("WorkspaceService", function(){

    var fs = require('fs');
    var path = require('path');

    this.saveWorkspace = function(name, html, css, js){
        // Determine if directory exists
        // Ask to overwrite or not

        // create dir inside local npm folder with name
        // save css/html/js files
        // save settings/config file

        fs.writeFile(path.join(__dirname, 'workspaces', name, 'test.html'), "hello test", function(err) {
            if(err) {
                return console.log(err);
            }
        });
    }

    this.loadWorkspace = function(name, html, css, js){

        // determine if saved name directory exists

        // load in files into editors
    }

});