'use strict';

var fs = require('fs');
var path = require('path');

$("#left-menu").resizable({
    handleSelector: ".splitter",
    resizeHeight: false
});

$("#code-panel-html").resizable({
    handleSelector: ".splitter-horizontal",
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

    var html = $('#code-panel-html').html();
    var css = $('#code-panel-css').html();
    var js = $('#code-panel-js').html();

    var title = "Output Title";

    var output = '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t\t<title>' + title +
        '</title>';

    output += '\n\t<style>\n' + css + '\n\t</style>\n';

    output += '</head>\n';

    output += '<body>\n' + html + '\n</body>\n</html>';

    return output;
};


