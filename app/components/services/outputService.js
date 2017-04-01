'use strict';

angular.module('app').service('OutputService', function(){

    var fs = require('fs');
    var path = require('path');

    // Writes the provided output string to the output.html file
    // reloads the output view
    this.generate = function(output){
        fs.writeFile(path.join(__dirname, 'output/output.html'), output, function(err) {
            if(err) {
                return console.log(err);
            }
            document.getElementById('output').contentDocument.location.reload(true);
        });
    };

});