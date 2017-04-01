'use strict';

angular.module('app')
    .controller('HomeCtrl', function($scope){

        var fs = require('fs');
        var path = require('path');
        var remote = require('electron').remote;

        $scope.closeWindow = function(){
            var window = remote.getCurrentWindow();
            window.close();
        };

        $scope.maximiseWindow = function(){
            var window = remote.getCurrentWindow();
            if (!window.isMaximized()) {
                window.maximize();
            } else {
                window.unmaximize();
            }
        };

        $scope.minimiseWindow = function(){
            var window = remote.getCurrentWindow();
            window.minimize();
        };


        var theme = "blackboard";

        var getLines = function(editor){
            var lines = "";
            for(var i=0;i<editor.lineCount();i++){
                lines+= "\t" + editor.getLine(i) + "\n";
            }
            return lines
        };

        $scope.layout = {
            menuPanel: true,
            codePanel: true,
            renderPanel: false
        };

        $scope.toggle = function(which) {
            $scope.layout[which] = !$scope.layout[which];
        };

        $scope.close = function(which) {
            $scope.layout[which] = true;
        };

        $scope.open = function(which) {
            $scope.layout[which] = false;
        };

        var getOutput = function(title){
            var output = '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t\t<title>' + title +
                '</title>';

            output += '\n\t<style>\n';

            output += getLines($scope.cssEditor);

            output+= '\n\t</style>\n';

            output += '</head>\n';

            output += '<body>\n';

            output += getLines($scope.htmlEditor);

            output += '\n</body>\n';

            output += '<script>\n';

            output += getLines($scope.jsEditor);

            output+='\n</script>\n</html>';

            return output;
        };

        var createOutput = function(){

            var title = "Output Title";

            fs.writeFile(path.join(__dirname, 'output/output.html'), getOutput(title), function(err) {
                if(err) {
                    return console.log(err);
                }

                console.log("The output file was saved!");

                document.getElementById('output').contentDocument.location.reload(true);
            });
        };

        $scope.initEditors = function() {

            $scope.htmlEditor = CodeMirror(document.getElementById("code-panel-html"), {
                mode: "xml",
                htmlMode: true,
                lineNumbers: true,
                scrollbarStyle: "overlay",
                theme: theme,
                minHeight: 50
            });

            $scope.cssEditor = CodeMirror(document.getElementById("code-panel-css"), {
                mode: "css",
                lineNumbers: true,
                scrollbarStyle: "simple",
                theme: theme,
                minHeight: 50
            });

            $scope.jsEditor = CodeMirror(document.getElementById("code-panel-js"), {
                mode: "javascript",
                lineNumbers: true,
                scrollbarStyle: "simple",
                theme: theme,
                minHeight: 50
            });
        }

        // Setup time variables
        var timer;
        // time to wait in ms before launching search
        var time = 1000;

        $scope.initTimer = function(){
            clearTimeout(timer);
            timer = setTimeout(doneTyping, time);
        };

        $scope.clearTimer = function(){
            clearTimeout(timer);
        };

        var doneTyping = function () {
            createOutput();
        };

    });