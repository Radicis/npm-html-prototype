'use strict';

angular.module('app').service('OutputService', function($q){

    var fs = require('fs');
    var path = require('path');

    this.init = function(){
        var def = $q.defer();
        fs.writeFile(path.join(__dirname, 'output', 'output.html'), "", function(err) {
            if(err) {
                def.resolve();
            }
            def.resolve();
        });
        return def.promise;
    };

    // Writes the provided output string to the output.html file
    // reloads the output view
    this.generate = function(html, css, js){
        var def = $q.defer();
        fs.writeFile(path.join(__dirname, 'output', 'output.html'), getOutput(html, css, js), function(err) {
            if(err) {
                def.resolve();
            }
            def.resolve();
        });
        return def.promise;
    };

    var getLines = function(editor){
        var lines = "";
        for(var i=0;i<editor.lineCount();i++){
            lines+= "\t" + editor.getLine(i) + "\n";
        }
        return lines
    };

    var getOutput = function(html, css, js){
        var output = '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t\t<title>nwp - Node Web Prototype</title>';

        output += '\n\t<style>\n';

        output += getLines(css);

        output+= '\n\t</style>\n';

        output += '</head>\n';

        output += '<body>\n';

        output += getLines(html);

        output += '\n</body>\n';

        output += '<script>\n';

        output += getLines(js);

        output+='\n</script>\n</html>';

        return output;
    };

});