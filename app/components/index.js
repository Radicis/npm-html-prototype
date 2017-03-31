'use strict';

var fs = require('fs');
var path = require('path');



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


