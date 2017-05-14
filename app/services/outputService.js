'use strict';

angular.module('app').service('OutputService', function(electron, DirectoryService, LibraryService, DialogService, StatusService){

    var fs = require('fs');
    var path = require('path');

    // Writes the provided output string to the output.html file
    // reloads the output view
    this.generate = function(html, css, js){
        var targetDir = path.join(__dirname, 'output');
        DirectoryService.verifyAndCreate(targetDir);
        fs.writeFile(path.join(__dirname, 'output/output.html'), getOutput(html, css, js), function(err) {
            if(err) {
                return console.log(err);
            }
            document.getElementById('output').contentDocument.location.reload(true);
        });
    };

    // Initialises the output directory to ensure it is present
    this.init = function(){
        var targetDir = path.join(__dirname, 'output');
        DirectoryService.verifyAndCreate(targetDir);
        // Delete any existing output file
        if(DirectoryService.pathExists(path.join(targetDir, "output.html")))
            fs.unlinkSync(path.join(targetDir, "output.html"));
    };


    // Generates the output string for the html of the output preview windows
    var getOutput = function(html, css, js, exportFlag){
        var output = '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<title>nwp - Node Web Prototype</title>';

        // Include vendor styles
        output+= LibraryService.getCSS();

        if(exportFlag) {
            output += '\n\t<link rel="stylesheet" href="css/main.css" />\n';
        }
        else{
            output += '\n\t<style>\n';

            output += css;

            output += '\n\t</style>\n';
        }

        output += '</head>\n';

        output += '<body>\n';

        output += html;

        output += '\n</body>\n';

        // Include vendor scripts
        output+= LibraryService.getJS();

        if(exportFlag) {
            output += '\n<script src="js/main.js"></script>\n';
        }
        else{
            output += '<script>\n';

            output += js;

            output += '\n</script>\n';
        }
        output+='</html>';

        return output;
    };

    // exports the workspace into a specified directory and scaffolds structure
    this.export = function(exportPath, title, html, css, js){

        try {
            var basePath = path.join(exportPath, title);

            // If the directory exists then append a string
            if(DirectoryService.pathExists(basePath)) {
                var d = new Date();
                basePath = basePath + Date.UTC(d.getMinutes(), d.getSeconds(), d.getMilliseconds());
            }

            // Create dir
            DirectoryService.verifyAndCreate(basePath);

            // Create index.html
            fs.writeFile(path.join(basePath, 'index.html'), getOutput(html, css, js, true), function(err){
                if(err)
                    return false;
            });

            // Create css dir
            var cssDir = path.join(basePath, "css");
            DirectoryService.verifyAndCreate(cssDir);

            // Create style.css
            console.log(css);
            fs.writeFile(path.join(cssDir, 'main.css'), css, function(err){
                if(err)
                    return false;
            });

            // Create js dir
            var jsDir = path.join(basePath, "js");
            DirectoryService.verifyAndCreate(jsDir);

            fs.writeFile(path.join(jsDir, 'main.js'), js, function(err){
                if(err)
                    return false;
            });

            // Create img dir
            var imgDir = path.join(basePath, "img");
            DirectoryService.verifyAndCreate(imgDir);

            // Create readme.md file by copying template
            fs.createReadStream(path.join(__dirname, 'res', "README.md")).pipe(fs.createWriteStream(path.join(basePath, 'README.md')));

            electron.shell.openItem(basePath);
            StatusService.log("Successfully Exported to: " + basePath);
        }
        catch(err){
            DialogService.error("Export failed due to unknown reason: " + err);
        }
    };

});