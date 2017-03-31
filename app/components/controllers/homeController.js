'use strict';

angular.module('app')

.controller('HomeCtrl', function($scope){
    console.log("I am a controller");

    var fs = require('fs');
    var path = require('path');

    var theme = "blackboard";

    $scope.createOutput = function(){

        var output;

        var title = "Output Title";

        var output = '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t\t<title>' + title +
            '</title>';

        output += '\n\t<style>\n';

        for(var i=0;i<cssEditor.lineCount();i++){
            output+= "\t\t" + cssEditor.getLine(i) + "\n";
        }

        output+= '\n\t</style>\n';

        output += '</head>\n';

        output += '<body>\n';

        for(var h=0;h<htmlEditor.lineCount();h++){
            output+= "\t" + htmlEditor.getLine(h) + "\n";
        }

        output += '\n</body>\n';

        output += '<script>\n';

        for(var j=0;j<jsEditor.lineCount();j++){
            output+= "\t" + jsEditor.getLine(j) + "\n";
        }

        output+='\n</script>\n</html>';

        fs.writeFile(path.join(__dirname, 'output/output.html'), output, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The output file was saved!");

            document.getElementById('output').contentDocument.location.reload(true);
        });
    };

    var htmlEditor = CodeMirror(document.getElementById("code-panel-html"), {
        mode : "xml",
        htmlMode: true,
        lineNumbers: true,
        scrollbarStyle: "simple",
        theme: theme,
        minHeight: 50
    });

    var cssEditor = CodeMirror(document.getElementById("code-panel-css"), {
        mode: "css",
        lineNumbers: true,
        scrollbarStyle: "simple",
        theme: theme,
        minHeight: 50
    });

    var jsEditor = CodeMirror(document.getElementById("code-panel-js"), {
        mode: "javascript",
        lineNumbers: true,
        scrollbarStyle: "simple",
        theme: theme,
        minHeight: 50
    });
});