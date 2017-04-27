angular.module("app").service("WorkspaceService", function(DialogService){

    var fs = require('fs');
    var path = require('path');

    // Saves the current workspace into it's own directory
    this.saveWorkspace = function(name, html, css, js){

        var workspaceDir = path.join(__dirname, 'workspaces');

        // Create root dir
        if (!fs.existsSync(workspaceDir)) {
            fs.mkdirSync(workspaceDir);
        }

        // Determine if directory exists
        var targetDir = path.join(workspaceDir, name);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir);
        }
        else{
            // Ask to overwrite or not
        }


        // create dir inside local npm folder with name
        // save css/html/js files
        // save settings/config file

        fs.writeFile(path.join(targetDir, 'test.html'), "hello test", function(err) {
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
    this.export = function(exportPath, title){

        try {

            var basePath = path.join(exportPath, title);

            // Create root dir
            if (!fs.existsSync(basePath)) {
                fs.mkdirSync(basePath);
            }

            // Create index.html from output.html
            fs.createReadStream(path.join(__dirname, 'output', "output.html")).pipe(fs.createWriteStream(path.join(basePath, 'index.html')));

            // Ensure cdns correct

            // Create css dir
            var cssDir = path.join(basePath, "css");
            if (!fs.existsSync(cssDir)) {
                fs.mkdirSync(cssDir);
            }
            // Create style.css


            // create css/vendor dir
            var cssVendorDir = path.join(cssDir, "vendor");
            if (!fs.existsSync(cssVendorDir)) {
                fs.mkdirSync(cssVendorDir);
            }
            // populate wih vendor css based on array

            // Create js dir
            var jsDir = path.join(basePath, "js");
            if (!fs.existsSync(jsDir)) {
                fs.mkdirSync(jsDir);
            }
            // Create main.js

            // Create js/vendor dir
            var jsVendorDir = path.join(jsDir, "vendor");
            if (!fs.existsSync(jsVendorDir)) {
                fs.mkdirSync(jsVendorDir);
            }
            // Populate dir with vendor scripts based on stored arrays

            // Create img dir
            var imgDir = path.join(basePath, "img");
            if (!fs.existsSync(imgDir)) {
                fs.mkdirSync(imgDir);
            }

            // Create readme.md file by copying template
            fs.createReadStream(path.join(__dirname, 'res', "README.md")).pipe(fs.createWriteStream(path.join(basePath, 'README.md')));
        }
        catch(err){
            DialogService.error("Export failed due to unknown reason");
        }
    };

});