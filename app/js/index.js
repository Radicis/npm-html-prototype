'use strict';

var fs = require('fs');
var path = require('path');

var theme = "blackboard";

// Create the html editor
var htmlEditor = CodeMirror(document.getElementById("code-panel-html"), {
    mode : "xml",
    htmlMode: true,
    lineNumbers: true,
    scrollbarStyle: "simple",
    theme: theme,
    minHeight: 50
});

// Create the css editor
var cssEditor = CodeMirror(document.getElementById("code-panel-css"), {
    mode: "css",
    lineNumbers: true,
    scrollbarStyle: "simple",
    theme: theme,
    minHeight: 50
});

// create the javascript editr
var jsEditor = CodeMirror(document.getElementById("code-panel-js"), {
    mode: "javascript",
    lineNumbers: true,
    scrollbarStyle: "simple",
    theme: theme,
    minHeight: 50
});

$("#left-menu").resizable({
    handleSelector: ".splitter",
    resizeHeight: false
});

$("#code-panel-html").resizable({
    handleSelector: ".splitter-horizontal",
    ghost: true,
    delay: 200,
    minWidth: 20,
    resizeWidth: false
});

$("#code-panel-css").resizable({
    handleSelector: ".splitter-horizontal-2",
    resizeWidth: false
});

$('#render-button').click(function () {

    fs.writeFile(path.join(__dirname, 'output/output.html'), createOutput(), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The output file was saved!");

        document.getElementById('output').contentDocument.location.reload(true);
    });

});


// Creates the html output including content from the html/css/js panels
var createOutput = function(){

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

    return output;
};


