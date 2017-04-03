angular.module("app").service("WorkspaceService", function(){

    var fs = require('fs');
    var path = require('path');

    // Saves the current workspace into it's own directory
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
    };

    // loads a workplace by name
    this.loadWorkspace = function(name, html, css, js){

        // determine if saved name directory exists

        // load in files into editors
    };

    // exports the workspace into a specified directory and scaffolds structure
    this.export = function(){
        // Create root dir
        // Create index.html from output.html
        // Ensure cdns correct

        // Create css dir
        // Create style.css

        // create css/vendor dir
        // populate wih vendor css based on array

        // Create js dir
        // Create main.js

        // Create js/vendor dir
        // Populate dir with vendor scripts based on stored arrays

        // Create readme.md

        // initialize git (if required)
        // create blank gitignore

        // open directory
    }

});