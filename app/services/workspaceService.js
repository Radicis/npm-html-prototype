angular.module("app").service("WorkspaceService", function($uibModal, DialogService, DirectoryService){

    var fs = require('fs');
    var path = require('path');

    // Saves the current workspace into it's own directory
    this.saveWorkspace = function(html, css, js){

        // // Display modal and prompt user for name
        // $uibModal.open({
        //     templateUrl: 'views/saveWorkspace.html',
        //     controller: 'WorkspaceCtrl as vm'
        // }).result.then(function(workSpaceName){
        //     console.log(workSpaceName);
        //     var workspaceDir = path.join(__dirname, 'workspaces');
        //
        //     // Create root dir
        //     DirectoryService.verifyAndCreate(workspaceDir);
        //
        //     // Determine if directory exists
        //     var targetDir = path.join(workspaceDir, name);
        //     if (DirectoryService.pathExists(targetDir)) {
        //         DirectoryService.verifyAndCreate(targetDir);
        //     }
        //     else{
        //         // Ask to overwrite or not
        //         DialogService.confirm("A workspace with this name already exists. Do you want to overwrite it?", function(buttonIndex){
        //             // If the confirmation is false then do nothing
        //             if(buttonIndex)
        //                 return false;
        //         });
        //     }
        //
        //     // create dir inside local app_data folder with name
        //     // save css/html/js files
        //     // save settings/config file
        //
        //     fs.writeFile(path.join(targetDir, 'test.html'), "hello test", function(err) {
        //         if(err) {
        //             return console.log(err);
        //         }
        //     });
        // }, function(){});

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
            DirectoryService.verifyAndCreate(basePath);

            // Create index.html from output.html
            fs.createReadStream(path.join(__dirname, 'output', "output.html")).pipe(fs.createWriteStream(path.join(basePath, 'index.html')));

            // Ensure cdns correct

            // Create css dir
            var cssDir = path.join(basePath, "css");
            DirectoryService.verifyAndCreate(cssDir);
            // Create style.css


            // create css/vendor dir
            var cssVendorDir = path.join(cssDir, "vendor");
            DirectoryService.verifyAndCreate(cssVendorDir);
            // populate wih vendor css based on array

            // Create js dir
            var jsDir = path.join(basePath, "js");
            DirectoryService.verifyAndCreate(jsDir);
            // Create main.js

            // Create js/vendor dir
            var jsVendorDir = path.join(jsDir, "vendor");
            DirectoryService.verifyAndCreate(jsVendorDir);
            // Populate dir with vendor scripts based on stored arrays

            // Create img dir
            var imgDir = path.join(basePath, "img");
            DirectoryService.verifyAndCreate(imgDir);

            // Create readme.md file by copying template
            fs.createReadStream(path.join(__dirname, 'res', "README.md")).pipe(fs.createWriteStream(path.join(basePath, 'README.md')));
        }
        catch(err){
            DialogService.error("Export failed due to unknown reason");
        }
    };

});